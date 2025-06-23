const User = require('../models/user'); // Assumes model with findByEmail or findByName

async function isEmailAvailable(email) {
  if (!email) throw Object.assign(new Error('Email is required'), { statusCode: 400 });
  const existing = await User.findByEmail(email);
  return !existing;
}

async function isNameAvailable(name) {
  if (!name) throw Object.assign(new Error('Name is required'), { statusCode: 400 });
  // Implement findByName or use a GSI
  const existing = await User.findByName(name);
  return !existing;
}

module.exports = { isEmailAvailable, isNameAvailable };
