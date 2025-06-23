const Role = require('../models/role');
const User = require('../models/user');

async function createRole({ name, permissions }) {
  const existing = await Role.findByName(name);
  if (existing) {
    const err = new Error('Role already exists');
    err.statusCode = 409;
    throw err;
  }
  const role = new Role({ name, permissions });
  await role.save();
  return role;
}

async function checkPermission(userId, permission) {
  const user = await User.findById(userId);
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
  const role = await Role.findByName(user.role);
  if (!role) throw Object.assign(new Error('Role not found'), { statusCode: 404 });
  return role.permissions.includes(permission);
}

module.exports = { createRole, checkPermission };
