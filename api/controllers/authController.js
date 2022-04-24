const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

exports.signup = async (req, res, next) => {
  try {
    // Creating a new user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    // Create token
    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // If email and password exist
    if (!email || !password) {
      return next(new Error('Please provide a valid email and password'));
    }

    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.verifyPassword(password, user.password))) {
      return next(new Error('Incorrect email and password'));
    }
    // if ok send token
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // Get token and check if its there
    let token = '';
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Verify token
    if (!token) {
      return next(new Error('You are not logged in'));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // Check if user still exists

    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
      return next(new Error('This user does not exist'));
    }
    // Check if password has been changed after token has been issued
    if (freshUser.changedPassword(decoded.iat)) {
      return next(
        new Error('User recently changed password. Please log in again')
      );
    }

    req.user = freshUser;
    next();
  } catch (error) {
    console.error(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  // Get user based on email
  const user = await User.findOne(req.body);

  if (!user) {
    return next(new Error('User does not exist'));
  }
  // Generate the reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // send token to users email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetPassword/${resetToken}`;

  const message = `Forgot your password?\n\n Use the link to reset your password. The link expires after 10 minutes.\n\n ${resetURL} \n\n If you did not forget your password, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Reset Your Password',
      message,
    });

    res.status(200).json({
      message: 'Token sent to email',
    });
  } catch (error) {
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new Error('Something went wrong'));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // Get user based on token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    // Set password if user exists and token has not expired
    if (!user) {
      return next(new Error('Token is invalid or has expired'));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save();

    // redirect to log in page
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    // Get user from collections
    const user = await User.findById(req.params.id).select('+password');

    if (!user) {
      return next(new Error('No user found'));
    }
    // Check if password is correct
    if (!(await user.verifyPassword(req.body.currentPassword, user.password))) {
      return next(new Error('Invalid password'));
    }
    user.password = req.body.newPassword;
    user.confirmPassword = req.body.confirmNewPassword;
    await user.save();
    // if so update password

    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: 'Updating password failed',
    });
  }
};
