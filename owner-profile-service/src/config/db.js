// src/config/db.js
const { Pool } = require('pg');
const config = require('./index');
const pool = new Pool(config.db);
module.exports = pool;
