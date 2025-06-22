// src/middlewares/validateInput.js

const { body, validationResult } = require('express-validator');

/**
 * Reglas de validación para el registro de usuario.
 */

const validateRegistration = [
  body('email')
    .isEmail().withMessage('El email debe ser válido'),
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

  // Middleware final que reúne los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Devolver primero un error 400 con el listado de problemas
      return res.status(400).json({
        errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
      });
    }
    next();
  }
];

module.exports = { validateRegistration };
