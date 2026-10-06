import express from 'express';
import { Income } from '../models/Income.js';

const router = express.Router();

// GET all income
router.get('/', async (req, res, next) => {
  try {
    const income = await Income.findAll();
    res.json(income);
  } catch (error) {
    next(error);
  }
});

// GET income by date range
router.get('/range', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate required' });
    }
    const income = await Income.findByDateRange(startDate, endDate);
    res.json(income);
  } catch (error) {
    next(error);
  }
});

// CREATE income
router.post('/', async (req, res, next) => {
  try {
    const { amount, source, date } = req.body;
    if (!amount || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const id = await Income.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    next(error);
  }
});

// GET total income
router.get('/summary/total', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate required' });
    }
    const total = await Income.getTotalIncome(startDate, endDate);
    res.json({ total });
  } catch (error) {
    next(error);
  }
});

export default router;
