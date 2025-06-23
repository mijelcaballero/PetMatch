// src/config/index.js
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3005,
  env:  process.env.NODE_ENV || 'development',
  db: {
    host:     process.env.PG_HOST,
    port:     +process.env.PG_PORT,
    user:     process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  }
};
