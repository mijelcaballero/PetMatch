// src/config/index.js
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION || '24h',
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
  },
  dynamodb: {
    tableUsers: process.env.DYNAMODB_TABLE_USERS || 'petmatch-users',
  }
};