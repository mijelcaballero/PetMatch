// src/controllers/registrationController.js
const { registerUser } = require('../services/registration.service');

exports.register = async (req, res, next) => {
  try {
    const userData = await registerUser(req.body);
    res.status(201).json({ message: 'User registered', user: userData });
  } catch (err) {
    next(err);
  }
};
