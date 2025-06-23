// src/controllers/authController.js

const { loginUser } = require('../services/auth.service');


exports.login = async (req, res, next) => {
  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { userId: user.userId, email: user.email, name: user.name, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ user: { userId, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt } });
  } catch (err) {
    next(err);
  }
};
