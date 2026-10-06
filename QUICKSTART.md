# Quick Start Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- MySQL (local or Docker)

## Local Development

### 1. Setup Database

```bash
# Using Docker (recommended)
docker run --name debt-manager-db \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=debt_manager \
  -p 3306:3306 \
  -d mysql:8.0
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Access the App

Open your browser and go to `http://localhost:5173`

## Production with Docker

```bash
docker-compose up --build
```

This will:
- Start MySQL on port 3306
- Start Backend API on port 5000
- Start Frontend on port 5173

## Environment Variables

### Backend (.env)

```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=debt_manager
CORS_ORIGIN=http://localhost:5173
```

## Testing

```bash
# E2E tests
cd frontend
npm run test:e2e
```

## Troubleshooting

**Port already in use:**
```bash
lsof -i :5000  # Find process on port 5000
kill -9 <PID>  # Kill process
```

**Database connection issues:**
- Ensure MySQL is running
- Check .env file credentials
- Verify database exists

**Node modules issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```
