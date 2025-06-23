const { isEmailAvailable, isNameAvailable } = require('../services/validation.service');

exports.checkEmail = async (req, res, next) => {
  try {
    const available = await isEmailAvailable(req.query.email);
    res.json({ field: 'email', available });
  } catch (err) {
    next(err);
  }
};

exports.checkName = async (req, res, next) => {
  try {
    const available = await isNameAvailable(req.query.name);
    res.json({ field: 'name', available });
  } catch (err) {
    next(err);
  }
};
