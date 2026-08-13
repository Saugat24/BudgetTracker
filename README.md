# Budget Tracker

A full-stack personal budget tracker with AI-powered spending insights.

## Features

- **Authentication** — JWT-based register/login
- **Transactions** — Add, edit, delete income & expense entries
- **Dashboard** — Monthly filter, balance summary, category chart
- **AI Insights** — Gemini-powered spending analysis with actionable advice

## Tech Stack

| Layer    | Tech                           |
| -------- | ------------------------------ |
| Frontend | React + Vite + Tailwind CSS    |
| Backend  | Node.js + Express + MongoDB    |
| AI       | Groq (llama-3.3-70b-versatile) |

## Getting Started

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=3001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
GROQ_API_KEY=your_groq_api_key
```

For deployment, set `FRONTEND_URL` to your Netlify site URL. If you use more than one frontend origin, separate them with commas in `FRONTEND_URLS`.

Create `frontend/.env` for local development:

```env
VITE_API_URL=http://localhost:3001/api
```

On Netlify, add `VITE_API_URL` in the site environment settings and point it at your Render backend, for example `https://your-backend.onrender.com/api`.

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## AI Insights

The **Get AI Insights** button on the dashboard sends the current month's transactions to `POST /api/ai/analyse`. The backend crafts a prompt for Groq (llama-3.3-70b-versatile) as a financial advisor and returns 4–6 bullet points of personalised spending advice.

## API Endpoints

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| POST   | /api/auth/register        | Register user               |
| POST   | /api/auth/login           | Login user                  |
| GET    | /api/transactions         | Get transactions (+ filter) |
| POST   | /api/transactions         | Create transaction          |
| PUT    | /api/transactions/:id     | Update transaction          |
| DELETE | /api/transactions/:id     | Delete transaction          |
| GET    | /api/transactions/summary | Monthly summary             |
| POST   | /api/ai/analyse           | AI spending analysis        |
