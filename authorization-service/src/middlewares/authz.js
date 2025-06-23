const { checkPermission } = require('../services/authorization.service');

function requirePermission(permission) {
  return async (req, res, next) => {
    const userId = req.user && req.user.userId;
    try {
      const allowed = await checkPermission(userId, permission);
      if (!allowed) return res.status(403).json({ error: 'Forbidden' });
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { requirePermission };
