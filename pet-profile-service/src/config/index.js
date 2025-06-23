// src/config/index.js
require('dotenv').config();
module.exports = {
  port: process.env.PORT || 3006,
  env:  process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI
};
// Note: The `mongoUri` is used to connect to MongoDB, which is different from the PostgreSQL configuration in the owner-profile-service example.
// Ensure that the environment variables are set correctly in your .env file for the pet-profile-service to function properly.
// Example .env file content:
// PORT=3006
// NODE_ENV=development
// MONGO_URI=mongodb://localhost:27017/pet-profile-service  