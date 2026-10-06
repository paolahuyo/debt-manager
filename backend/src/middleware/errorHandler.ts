import { Request, Response, NextFunction } from 'express';

interface DatabaseError extends Error {
  code?: string;
  status?: number;
}

export function errorHandler(
  err: DatabaseError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Error:', err);

  // Database connection errors
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    res.status(503).json({ error: 'Database connection lost' });
    return;
  }

  // Validation errors
  if (err.code === 'ER_BAD_FIELD_ERROR') {
    res.status(400).json({ error: 'Invalid field' });
    return;
  }

  // Duplicate entry errors
  if (err.code === 'ER_DUP_ENTRY') {
    res.status(409).json({ error: 'Duplicate entry' });
    return;
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}
