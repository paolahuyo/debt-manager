import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db/init';
import debtsRouter from './routes/debts';
import incomeRouter from './routes/income';
import strategyRouter from './routes/strategy';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());

// Initialize database
initDb().catch(err => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});

// Routes
app.use('/api/debts', debtsRouter);
app.use('/api/income', incomeRouter);
app.use('/api/strategy', strategyRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
