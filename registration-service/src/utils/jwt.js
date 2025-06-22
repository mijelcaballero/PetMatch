// src/utils/jwt.js
const jwt = require('jsonwebtoken');
const config = require('../config');

// Generar token JWT
const generateToken = (user) => {
    
  const payload = {
    userId: user.userId,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

// Verificar token JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    console.error('Error al verificar token:', error);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};