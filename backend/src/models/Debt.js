import { getPool } from '../db/init.js';

export class Debt {
  static async findAll() {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM debts WHERE status = "active"');
    return rows;
  }

  static async findById(id) {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM debts WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const pool = getPool();
    const { name, amount, interest_rate, min_payment } = data;
    const [result] = await pool.query(
      'INSERT INTO debts (name, amount, interest_rate, min_payment) VALUES (?, ?, ?, ?)',
      [name, amount, interest_rate || 0, min_payment]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const pool = getPool();
    const { name, amount, interest_rate, min_payment, status } = data;
    await pool.query(
      'UPDATE debts SET name = ?, amount = ?, interest_rate = ?, min_payment = ?, status = ? WHERE id = ?',
      [name, amount, interest_rate, min_payment, status, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    const pool = getPool();
    await pool.query('DELETE FROM debts WHERE id = ?', [id]);
  }

  static async getTotalDebt() {
    const pool = getPool();
    const [rows] = await pool.query('SELECT SUM(amount) as total FROM debts WHERE status = "active"');
    return rows[0].total || 0;
  }
}
