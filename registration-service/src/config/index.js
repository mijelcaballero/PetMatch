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

  aws: {
    // El SDK tomará credentials del Instance Profile
    region: process.env.AWS_REGION || 'us-east-1',
  },

  dynamodb: {
    tableUsers: process.env.DYNAMODB_TABLE_USERS
  }

};

