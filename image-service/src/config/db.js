const sqlite3 = require('sqlite3').verbose();
const { sqlite } = require('./index');
const db = new sqlite3.Database(sqlite.storage);
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS images (
    id TEXT PRIMARY KEY,
    key TEXT,
    url TEXT,
    uploadedAt TEXT
  )`);
});
module.exports = db;
