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

---

## Application Flow

### 1. Sign Up Flow

```
User visits /register
    ↓
Fills registration form (First Name, Last Name, Username, Email, Role, Password)
    ↓
Frontend validates with Zod schema
    ↓
POST /api/auth/register
    ↓
Backend validates input → Hashes password → Creates user in MongoDB
    ↓
Returns success response
    ↓
User redirected to Login page (/)
```

**Files involved:**
- `real-estate-client/src/modules/auth-modules/page/register.tsx`
- `real-estate-client/src/apis/hooks/auth.hooks.ts`
- `server/src/controllers/auth.controller.ts`
- `server/src/services/auth.service.ts`

### 2. Login Flow

```
User visits / (Login page)
    ↓
Enters email and password
    ↓
Frontend validates with Zod schema
    ↓
POST /api/auth/login
    ↓
Backend verifies credentials → Generates JWT token
    ↓
Token stored in localStorage
    ↓
User redirected to Dashboard (/dashboard)
```

**Files involved:**
- `real-estate-client/src/modules/auth-modules/page/login.tsx`
- `real-estate-client/src/apis/hooks/auth.hooks.ts`
- `real-estate-client/src/apis/auth.ts`
- `server/src/controllers/auth.controller.ts`
- `server/src/services/auth.service.ts`

### 3. Add to Favorites Flow

```
User browses properties on /dashboard
    ↓
Clicks heart icon on a property card
    ↓
useToggleSaveAsFavorite hook called
    ↓
POST /api/favorites?realEstateId=<id>&isFavorite=true
    ↓
Backend creates/updates favorite document (userId + realEstateId)
    ↓
Query cache invalidated → UI updates in real-time
    ↓
Favorite count updated in navbar
    ↓
User can view saved properties at /dashboard/saved
```

**Files involved:**
- `real-estate-client/src/modules/broker-dashboard-modules/page/buyer/index.tsx`
- `real-estate-client/src/modules/broker-dashboard-modules/page/favorite/index.tsx`
- `real-estate-client/src/apis/hooks/favorite.hooks.ts`
- `real-estate-client/src/apis/services/favorite.service.ts`
- `server/src/controllers/favorite.controller.ts`
- `server/src/services/favorite.service.ts`

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Real Estate (Properties)
- `GET /api/real-estate` - Get all listings (with pagination & filters)
- `POST /api/real-estate` - Create new listing (admin only)

### Favorites
- `POST /api/favorites` - Toggle favorite status
- `GET /api/favorites/by-user` - Get user's favorites
- `GET /api/favorites/count` - Get favorite count

### Users
- `GET /api/users/:id` - Get user details

---
