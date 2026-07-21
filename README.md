# FinTrack — Backend API

Node.js/Express REST API for the [FinTrack frontend](https://github.com/areeshataucqeer/finai1-frontend) — handles transactions, budgets, and savings goals, backed by MongoDB.

> 📱 This is the **backend** repo. The React Native/Expo app that consumes this API lives here: [finai1-frontend](https://github.com/areeshataucqeer/finai1-frontend)

## Features

- CRUD for expense transactions
- Budget storage with cycle start date tracking
- Savings goals — create, add funds, delete, with progress tracked against a target amount

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (via Mongoose)

## Project Structure

```
models/
  Transaction.js     → transaction schema
  SavingsGoal.js      → savings goal schema
  UserSettings.js     → budget/user config schema
routes/
  transactions.js     → API endpoints
server.js              → app entry point
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions` | Add a new transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |
| GET | `/api/transactions/budget` | Get current budget |
| POST | `/api/transactions/budget` | Set/update budget |
| GET | `/api/transactions/goals` | Get all savings goals |
| POST | `/api/transactions/goals` | Create a savings goal |
| PUT | `/api/transactions/goals/:id/add-funds` | Add funds to a goal |
| DELETE | `/api/transactions/goals/:id` | Delete a savings goal |

## Running Locally

1. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/areeshataucqeer/finai1-backend.git
   cd finai1-backend
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your own values:
   ```bash
   cp .env.example .env
   ```
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_secret_here
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. The API will be running at `http://localhost:5000`. Point the [frontend](https://github.com/areeshataucqeer/finai1-frontend)'s `API_BASE_URL` to this address (or your machine's local IP if testing on a physical device via Expo Go).

## What I'd improve next

- Deploy to Render/Railway with MongoDB Atlas for a publicly reachable API
- Add authentication (JWT) so transactions/goals are scoped per user
- Add request validation middleware and centralized error handling
