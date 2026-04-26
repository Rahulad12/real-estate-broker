# Project Wiki: Real Estate
Welcome to the technical wiki for the Real Estate application. This document provides an in-depth look at the system architecture, data models, API design, and frontend structure.

---

## 1. System Architecture

The application follows a classic client-server architecture with a clear separation of concerns.

- **Frontend**: A modern Single Page Application (SPA) built with React 19 and Vite. It utilizes a module-based architecture for scalability.
- **Backend**: A RESTful API built with Node.js and Express 5. It follows a layered pattern: Routes -> Controllers -> Services -> Models.
- **Database**: MongoDB for flexible data storage, managed via Mongoose ODM.
- **Authentication**: JWT-based stateless authentication.

---

## 2. Data Models (Database Schema)

### User Model
Stored in the `users` collection.
- `email` (String, Required): User's unique email address.
- `password` (String, Required): Hashed password.
- `userName` (String, Required): Unique identifier for the user.
- `firstName` (String, Required): User's first name.
- `lastName` (String, Required): User's last name.
- `role` (String, Required): User role (e.g., 'user', 'admin', 'broker'). Default is 'user'.
- `timestamps`: `createdAt`, `updatedAt`.

### Real Estate (Property) Model
Stored in the `realestates` collection.
- `title` (String, Required): Name of the property.
- `description` (String, Required): Detailed description.
- `price` (Number, Required): Asking price.
- `location` (Object, Required):
    - `address` (String)
    - `lng` (String)
    - `lat` (String)
- `bedrooms` (Number, Required): Number of bedrooms.
- `bathrooms` (Number, Required): Number of bathrooms.
- `area` (Number, Required): Total area in sq. ft.
- `propertyType` (String, Required): e.g., 'House', 'Apartment'.
- `status` (String, Required): e.g., 'Available', 'Sold'.
- `type` (String, Required): e.g., 'Sale', 'Rent'.
- `timestamps`: `createdAt`, `updatedAt`.

### Favorite Model
Stored in the `favorites` collection. Connects Users to Properties.
- `userId` (ObjectId, Ref: 'User'): The user who saved the property.
- `realEstateId` (ObjectId, Ref: 'RealEstate'): The property being saved.
- `isFavorite` (Boolean): Current status.
- `timestamps`: `createdAt`, `updatedAt`.

---

## 3. API Documentation

### Base URL: `/api`

#### Authentication (`/auth`)
- `POST /register`: Register a new user.
- `POST /login`: Authenticate user and return JWT.

#### Real Estate (`/real-estate`)
- `GET /`: List properties with filtering and pagination.
    - Query params: `page`, `limit`, `search`, `propertyType`, `minPrice`, `maxPrice`.
- `POST /`: Create a new property listing (Requires auth & appropriate role).

#### Favorites (`/favorites`)
- `POST /`: Toggle favorite status for a property.
- `GET /by-user`: Get all favorites for the logged-in user.
- `GET /count`: Get the total count of favorites for the logged-in user.

---

## 4. Frontend Architecture

The frontend is organized into **Modules** located in `src/modules/`. Each module is self-contained with its own pages, components, types, and validation schemas.

### Core Modules
1. **Auth Module**: Handles Login and Registration flows.
2. **Broker Dashboard Module**: The main application interface for browsing, filtering, and managing properties/favorites.

### Global State & Data Fetching
- **TanStack Query (React Query)**: Used for all server-state management. Hooks are centralized in `src/apis/hooks/`.
- **React Hook Form + Zod**: Used for form management and client-side validation.

### UI Components
- **Shadcn UI**: Base UI components (Button, Card, Input, etc.) are in `src/components/ui/`.
- **Custom Components**: Module-specific UI elements are in `src/modules/<module-name>/component/`.

---

## 5. Development Workflow

### Coding Standards
- **TypeScript**: Mandatory for all new code. Use strict mode.
- **Naming**: PascalCase for components, camelCase for variables/functions.
- **Imports**: Use the `@/` alias for absolute paths from `src/`.

### Commands Reference
| Area | Command | Purpose |
| --- | --- | --- |
| Root | `npm install` | Install all dependencies |
| Client | `npm run dev` | Start frontend development server |
| Server | `npm run dev` | Start backend development server (with nodemon) |
| Server | `npm run format` | Run Prettier to format code |

---

## 6. Environment Configuration

### Server (`.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Client (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
