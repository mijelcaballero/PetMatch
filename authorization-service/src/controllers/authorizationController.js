const { createRole, checkPermission } = require('../services/authorization.service');

exports.createRole = async (req, res, next) => {
  try {
    const role = await createRole(req.body);
    res.status(201).json(role);
  } catch (err) {
    next(err);
  }
};

exports.verify = async (req, res, next) => {
  try {
    const { userId, permission } = req.body;
    const allowed = await checkPermission(userId, permission);
    res.json({ allowed });
  } catch (err) {
    next(err);
  }
};
