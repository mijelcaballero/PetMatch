const db = require('../config/db');
class Video {
  static create(meta) {
    const { id, key, url, uploadedAt } = meta;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO videos (id, key, url, uploadedAt) VALUES (?, ?, ?, ?)`,
        [id, key, url, uploadedAt],
        function(err) {
          if (err) return reject(err);
          resolve(meta);
        }
      );
    });
  }
  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM videos WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }
}
module.exports = Video;
