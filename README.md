# Real Estate Broker Application

A full-stack real estate listing platform with user authentication, property listings, and favorites management.

## Project Structure

```
Techkraft/
├── real-estate-client/    # React + TypeScript + Vite Frontend
└── server/                # Node.js + Express + MongoDB Backend
```

---

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

---

## Quick Start

### 1. Clone and Navigate

```bash
cd Techkraft
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Environment setup
cp .env.example .env
# Edit .env and add your values:
# - MONGO_URI: Your MongoDB connection string
# - PORT: Server port (default: 5000)
# - JWT_SECRET: Secret key for JWT tokens

# Development mode
npm run dev
```

The server will start at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd real-estate-client

# Install dependencies
npm install

# Environment setup
cp .env.example .env
# Edit .env:
# - VITE_API_BASE_URL: Backend URL (http://localhost:5000/api)

# Development mode
npm run dev
```

The client will start at `http://localhost:5173`

---

## Available Scripts

### Backend (`/server`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

### Frontend (`/real-estate-client`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

