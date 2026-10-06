import { getPool } from '../db/init';

export interface IIncome {
  id: number;
  amount: number;
  source?: string;
  date: Date;
  created_at?: Date;
}

export class Income {
  static async findAll(): Promise<IIncome[]> {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM income ORDER BY date DESC');
    return rows as IIncome[];
  }

  static async findByDateRange(startDate: string, endDate: string): Promise<IIncome[]> {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT * FROM income WHERE date BETWEEN ? AND ? ORDER BY date DESC',
      [startDate, endDate]
    );
    return rows as IIncome[];
  }

  static async create(data: Partial<IIncome>): Promise<number> {
    const pool = getPool();
    const { amount, source, date } = data;
    const [result] = await pool.query(
      'INSERT INTO income (amount, source, date) VALUES (?, ?, ?)',
      [amount, source, date]
    ) as any;
    return result.insertId;
  }

  static async getTotalIncome(startDate: string, endDate: string): Promise<number> {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT SUM(amount) as total FROM income WHERE date BETWEEN ? AND ?',
      [startDate, endDate]
    ) as any;
    return rows[0].total || 0;
  }
}
