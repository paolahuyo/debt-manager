# 💰 Finance Manager

A full-stack web application to help you manage, track, and eliminate debt efficiently.

## Features

✅ **Debt Tracking** - Add and manage multiple debts with interest rates
✅ **Income Tracking** - Record and monitor your income streams
✅ **Smart Strategies** - Snowball and Avalanche debt payoff strategies
✅ **Visual Dashboard** - Real-time overview of your financial situation
✅ **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

### Backend
- Node.js + Express
- MySQL
- RESTful API

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios

## Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for setup instructions.

## Project Structure

```
finance-manager/
├── backend/          # Express API
│   ├── src/
│   │   ├── db/      # Database initialization
│   │   ├── models/  # Data models
│   │   ├── routes/  # API routes
│   │   └── services/# Business logic
│   └── package.json
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
└── docker-compose.yml
```

## Usage

1. Add your debts with details (name, amount, interest rate)
2. Record your monthly income
3. View your financial summary
4. Get recommendations for debt payoff strategies

## Docker Deployment

```bash
docker-compose up
```

## License

MIT

## Author

Angela Paolah
