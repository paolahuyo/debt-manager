export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Database connection errors
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    return res.status(503).json({ error: 'Database connection lost' });
  }

  // Validation errors
  if (err.code === 'ER_BAD_FIELD_ERROR') {
    return res.status(400).json({ error: 'Invalid field' });
  }

  // Duplicate entry errors
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: 'Duplicate entry' });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}
