const User = require('../models/User');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
