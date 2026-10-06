import { getPool } from '../db/init';

export interface IDebt {
  id: number;
  name: string;
  amount: number;
  interest_rate: number;
  min_payment?: number;
  status: 'active' | 'paid';
  created_at?: Date;
  updated_at?: Date;
}

export class Debt {
  static async findAll(): Promise<IDebt[]> {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM debts WHERE status = "active"');
    return rows as IDebt[];
  }

  static async findById(id: number): Promise<IDebt | undefined> {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM debts WHERE id = ?', [id]);
    return (rows as IDebt[])[0];
  }

  static async create(data: Partial<IDebt>): Promise<number> {
    const pool = getPool();
    const { name, amount, interest_rate, min_payment } = data;
    const [result] = await pool.query(
      'INSERT INTO debts (name, amount, interest_rate, min_payment) VALUES (?, ?, ?, ?)',
      [name, amount, interest_rate || 0, min_payment]
    ) as any;
    return result.insertId;
  }

  static async update(id: number, data: Partial<IDebt>): Promise<IDebt | undefined> {
    const pool = getPool();
    const { name, amount, interest_rate, min_payment, status } = data;
    await pool.query(
      'UPDATE debts SET name = ?, amount = ?, interest_rate = ?, min_payment = ?, status = ? WHERE id = ?',
      [name, amount, interest_rate, min_payment, status, id]
    );
    return this.findById(id);
  }

  static async delete(id: number): Promise<void> {
    const pool = getPool();
    await pool.query('DELETE FROM debts WHERE id = ?', [id]);
  }

  static async getTotalDebt(): Promise<number> {
    const pool = getPool();
    const [rows] = await pool.query('SELECT SUM(amount) as total FROM debts WHERE status = "active"') as any;
    return rows[0].total || 0;
  }
}
