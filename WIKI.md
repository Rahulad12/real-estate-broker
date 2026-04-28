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

### Scheduling Model
Stored in the `schedulings` collection. Manages viewing requests.
- `property` (ObjectId, Ref: 'RealEstate'): Linked property.
- `user` (ObjectId, Ref: 'User'): Buyer who requested the viewing.
- `agent` (ObjectId, Ref: 'User', Optional): Assigned agent.
- `requestedDate` (Date): Date for the viewing.
- `status` (String): `pending`, `confirmed`, `completed`, `cancelled`, `rescheduled`.
- `adminNotes` (String): Internal notes.

---

## 3. API Documentation

### Base URL: `/api`

#### Authentication (`/auth`)
- `POST /register`: Register a new user.
- `POST /login`: Authenticate user and return JWT.

#### Real Estate (`/real-estate`)
- `GET /`: List properties with filtering and pagination.
- `POST /`: Create a new property listing (Requires auth & appropriate role).

#### Admin (`/admin`)
Requires `admin` role.
- `GET /stats`: Get system-wide statistics for dashboards.
- `GET /users`: List all users.
- `POST /users`: Create user as admin.
- `PATCH /users/:id`: Update user as admin.
- `DELETE /users/:id`: Delete user.
- `POST /properties`: Create property as admin.
- `PATCH /properties/:id`: Update property as admin.
- `DELETE /properties/:id`: Delete property.

#### Scheduling (`/scheduling`)
- `POST /`: Create a viewing request (Buyer).
- `GET /`: List all requests (Admin).
- `PATCH /:id`: Update status/notes (Admin).
- `GET /stats`: Get scheduling-specific stats (Admin).

---

## 4. Frontend Architecture

The frontend is organized into **Modules** located in `src/modules/`.

### Admin Modules (`src/modules/admin-modules/`)
- **Layout**: Uses `AdminLayout` with a modular `AdminSidebar`.
- **Navigation**: Supports hierarchical menus (e.g., Management vs. Stats).
- **Visualization**: Integrates **Recharts** for data-driven dashboards in every parent module.
- **Pages**:
    - `dashboard/`: System-wide KPI overview.
    - `users/`: List management and role distribution charts.
    - `properties/`: Listing management and status charts.
    - `scheduling/`: Viewing request management and trend charts.

### Core Modules
1. **Auth Module**: Handles Login and Registration flows.
2. **Broker Dashboard Module**: The main application interface for browsing properties.
3. **Property Details Module**: Detailed property view and scheduling trigger.

---

## 5. Development Workflow

### Coding Standards
- **TypeScript**: Mandatory for all new code.
- **Charts**: Use **Recharts** for all data visualizations.
- **Sidebar**: Modular structure in `admin-sidebar.tsx` for easy menu expansion.

---
