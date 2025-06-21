// src/middlewares/auth.js
const { verifyToken } = require('../utils/jwt');

// Middleware para verificar autenticación
const authenticate = (req, res, next) => {
  // Obtener token de la cabecera de autorización
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
  }

  // Extraer el token
  const token = authHeader.split(' ')[1];
  
  // Verificar el token
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }

  // Añadir usuario al objeto de solicitud
  req.user = decoded;
  
  next();
};

// Middleware para verificar roles
const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'No tienes permiso para acceder a este recurso' });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};