import express, { Router, Request, Response, NextFunction } from 'express';
import { Debt } from '../models/Debt';
import { Income } from '../models/Income';
import { calculateStrategy } from '../services/debtStrategy';

const router: Router = express.Router();

// GET debt repayment strategy
router.post('/calculate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { availableAmount, strategy } = req.body;

    if (!availableAmount || !strategy) {
      res.status(400).json({ error: 'availableAmount and strategy required' });
      return;
    }

    const debts = await Debt.findAll();
    const result = calculateStrategy(debts, availableAmount, strategy);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET financial overview
router.get('/overview', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const debts = await Debt.findAll();
    const totalDebt = debts.reduce((sum, d) => sum + parseFloat(d.amount.toString()), 0);

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const monthlyIncome = await Income.getTotalIncome(
      startOfMonth.toISOString().split('T')[0],
      endOfMonth.toISOString().split('T')[0]
    );

    res.json({
      totalDebt,
      debtCount: debts.length,
      monthlyIncome,
      debts: debts.map(d => ({
        id: d.id,
        name: d.name,
        amount: d.amount,
        interestRate: d.interest_rate
      }))
    });
  } catch (error) {
    next(error);
  }
});

export default router;
