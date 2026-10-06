import express from 'express';
import { Debt } from '../models/Debt.js';

const router = express.Router();

// GET all debts
router.get('/', async (req, res, next) => {
  try {
    const debts = await Debt.findAll();
    res.json(debts);
  } catch (error) {
    next(error);
  }
});

// GET single debt
router.get('/:id', async (req, res, next) => {
  try {
    const debt = await Debt.findById(req.params.id);
    if (!debt) return res.status(404).json({ error: 'Debt not found' });
    res.json(debt);
  } catch (error) {
    next(error);
  }
});

// CREATE debt
router.post('/', async (req, res, next) => {
  try {
    const { name, amount, interest_rate, min_payment } = req.body;
    if (!name || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const id = await Debt.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    next(error);
  }
});

// UPDATE debt
router.put('/:id', async (req, res, next) => {
  try {
    const debt = await Debt.update(req.params.id, req.body);
    if (!debt) return res.status(404).json({ error: 'Debt not found' });
    res.json(debt);
  } catch (error) {
    next(error);
  }
});

// DELETE debt
router.delete('/:id', async (req, res, next) => {
  try {
    await Debt.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// GET total debt
router.get('/summary/total', async (req, res, next) => {
  try {
    const total = await Debt.getTotalDebt();
    res.json({ total });
  } catch (error) {
    next(error);
  }
});

export default router;
