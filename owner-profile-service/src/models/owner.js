// src/models/owner.js
const pool = require('../config/db');

class Owner {
  static async create({ name, email }) {
    const { rows } = await pool.query(
      'INSERT INTO owners(name,email) VALUES($1,$2) RETURNING *',
      [name, email]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM owners WHERE id=$1',
      [id]
    );
    return rows[0] || null;
  }

  static async update(id, { name, email }) {
    const { rows } = await pool.query(
      `UPDATE owners SET name=$1,email=$2,updated_at=NOW()
       WHERE id=$3 RETURNING *`,
      [name, email, id]
    );
    return rows[0] || null;
  }

  static async delete(id) {
    await pool.query('DELETE FROM owners WHERE id=$1', [id]);
  }
}

module.exports = Owner;
