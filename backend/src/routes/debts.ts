import express, { Router, Request, Response, NextFunction } from 'express';
import { Debt } from '../models/Debt';

const router: Router = express.Router();

// GET all debts
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const debts = await Debt.findAll();
    res.json(debts);
  } catch (error) {
    next(error);
  }
});

// GET single debt
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const debt = await Debt.findById(parseInt(req.params.id));
    if (!debt) {
      res.status(404).json({ error: 'Debt not found' });
      return;
    }
    res.json(debt);
  } catch (error) {
    next(error);
  }
});

// CREATE debt
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, amount } = req.body;
    if (!name || !amount) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
    const id = await Debt.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    next(error);
  }
});

// UPDATE debt
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const debt = await Debt.update(parseInt(req.params.id), req.body);
    if (!debt) {
      res.status(404).json({ error: 'Debt not found' });
      return;
    }
    res.json(debt);
  } catch (error) {
    next(error);
  }
});

// DELETE debt
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Debt.delete(parseInt(req.params.id));
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// GET total debt
router.get('/summary/total', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const total = await Debt.getTotalDebt();
    res.json({ total });
  } catch (error) {
    next(error);
  }
});

export default router;
