// src/services/registration.service.js

const User = require('../models/user');
const { hashPassword } = require('../utils/hash');

async function registerUser({ email, password, name }) {
  // 1) Comprueba que nos lleguen todos los campos
  if (!email || !password || !name) {
    const err = new Error('Email, password and name are required');
    err.statusCode = 400;
    throw err;
  }

  // 2) Verifica que no exista ya un usuario con ese email
  const existing = await User.findByEmail(email);
  if (existing) {
    const err = new Error('Email already registered');
    err.statusCode = 409;
    throw err;
  }

  // 3) Hashea la contraseña
  const hashed = await hashPassword(password);

  // 4) Crea la instancia y guarda en DynamoDB
  const user = new User({
    email,
    password: hashed,
    name
  });
  await user.save();

  // 5) Devuelve sólo los campos esenciales
  return {
    userId: user.userId,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt
  };
}

module.exports = { registerUser };
