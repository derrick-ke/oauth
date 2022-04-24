const User = require('../models/User');

const filterBody = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error,
    });
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    if (req.body.password || req.body.confirmPassword) {
      return next(new Error('This route does not update your password'));
    }

    const filteredBody = filterBody(req.body, 'email');
    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidation: true,
    });

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
    });
  }
};

exports.deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
    });
  }
};
