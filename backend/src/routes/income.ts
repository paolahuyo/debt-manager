import express, { Router, Request, Response, NextFunction } from 'express';
import { Income } from '../models/Income';

const router: Router = express.Router();

// GET all income
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const income = await Income.findAll();
    res.json(income);
  } catch (error) {
    next(error);
  }
});

// GET income by date range
router.get('/range', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      res.status(400).json({ error: 'startDate and endDate required' });
      return;
    }
    const income = await Income.findByDateRange(startDate as string, endDate as string);
    res.json(income);
  } catch (error) {
    next(error);
  }
});

// CREATE income
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount, date } = req.body;
    if (!amount || !date) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
    const id = await Income.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    next(error);
  }
});

// GET total income
router.get('/summary/total', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      res.status(400).json({ error: 'startDate and endDate required' });
      return;
    }
    const total = await Income.getTotalIncome(startDate as string, endDate as string);
    res.json({ total });
  } catch (error) {
    next(error);
  }
});

export default router;
