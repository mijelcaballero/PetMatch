// src/services/auth.service.js

const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

async function registerUser({ email, password, name }) {
  // 1) Validaciones básicas
  if (!email || !password || !name) {
    const err = new Error('Todos los campos son obligatorios');
    err.statusCode = 400;
    throw err;
  }

  // 2) Verificar duplicado
  const existing = await User.findByEmail(email);
  if (existing) {
    const err = new Error('El correo electrónico ya está registrado');
    err.statusCode = 409;
    throw err;
  }

  // 3) Hashear y guardar
  const hashed = await hashPassword(password);
  const user = new User({ email, password: hashed, name });
  await user.save();

  // 4) Generar token
  const token = generateToken(user);
  return { user, token };
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    const err = new Error('Correo y contraseña son obligatorios');
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findByEmail(email);
  if (!user) {
    const err = new Error('Credenciales inválidas');
    err.statusCode = 401;
    throw err;
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    const err = new Error('Credenciales inválidas');
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken(user);
  return { user, token };
}

module.exports = { registerUser, loginUser };
