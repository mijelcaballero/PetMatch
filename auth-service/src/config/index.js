// src/config/index.js
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  console.error('Failed to load .env file:', result.error);
  process.exit(1);
}

module.exports = {

  port: process.env.PORT || 3000,
  env:  process.env.NODE_ENV || 'development',

  // Solo para auth-service:
  jwt: {
    secret:    (() => {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not defined');
      }
      return process.env.JWT_SECRET;
    })(),
    expiresIn: process.env.JWT_EXPIRATION,
  },

  aws: {
    // El SDK tomará credentials del Instance Profile
    region: process.env.AWS_REGION || 'us-east-1',
  },

  dynamodb: {
    tableUsers: process.env.DYNAMODB_TABLE_USERS,
    tableRoles: process.env.DYNAMODB_TABLE_ROLES,
  }
};

