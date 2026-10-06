import { getPool } from '../db/init.js';

export class Income {
  static async findAll() {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM income ORDER BY date DESC');
    return rows;
  }

  static async findByDateRange(startDate, endDate) {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT * FROM income WHERE date BETWEEN ? AND ? ORDER BY date DESC',
      [startDate, endDate]
    );
    return rows;
  }

  static async create(data) {
    const pool = getPool();
    const { amount, source, date } = data;
    const [result] = await pool.query(
      'INSERT INTO income (amount, source, date) VALUES (?, ?, ?)',
      [amount, source, date]
    );
    return result.insertId;
  }

  static async getTotalIncome(startDate, endDate) {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT SUM(amount) as total FROM income WHERE date BETWEEN ? AND ?',
      [startDate, endDate]
    );
    return rows[0].total || 0;
  }
}
