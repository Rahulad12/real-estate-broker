# Real Estate Broker Application

A modern, full-stack real estate listing platform designed for property management, user authentication, and seamless scheduling. This project features a robust TypeScript backend and a dynamic React frontend, built with scalability and clean architecture in mind.

## 🏗 Project Structure

The repository is organized into a monorepo-style structure to separate concerns between the frontend, backend, and documentation.

```text
.
├── .agents/                # AI Agent configurations, specialized skills, and task tracking
├── real-estate-client/     # Frontend: React (Vite) + TypeScript + Tailwind CSS
├── real-estate-server/     # Backend: Node.js (Express) + TypeScript + MongoDB
├── real-estate-docs/       # Project requirements and design documentation
└── AGENTS.md               # Documentation for AI agent integration
```

### 💻 [real-estate-client](./real-estate-client)
The frontend application built with React, Vite, and TypeScript. It uses a modular architecture to organize features.

- **`src/apis/`**: Contains API integration logic, including Axios instances and custom React Query hooks for data fetching.
- **`src/components/`**: Houses reusable UI components (built with Shadcn/UI) and shared layout elements like maps and data tables.
- **`src/modules/`**: The core of the application, divided into feature-based modules (e.g., Auth, Admin, Broker Dashboard, Property Details). Each module contains its own pages, components, and validation schemas.
- **`src/routes/`**: Manages application routing, including public and protected route definitions.
- **`src/guard/`**: Implementation of route guards for authentication and role-based access control.

### ⚙️ [real-estate-server](./real-estate-server)
The backend API built with Express and TypeScript, following a modular pattern for maintainability.

- **`src/modules/`**: Feature-specific logic separated into modules like `auth`, `user`, `real-estate` (property management), and `scheduling`.
- **`src/middleware/`**: Custom Express middlewares for authentication, role validation, error handling, and file uploads.
- **`src/config/`**: Centralized configuration for database connections and environment variables.
- **`src/scripts/`**: Utility scripts for database seeding and initial setup.

### 🤖 [.agents](./.agents)
This folder contains configurations for Gemini CLI agents, including custom rules and automated skills that assist with development workflows like testing, building, and documentation generation.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **MongoDB**: A local instance or MongoDB Atlas account
- **npm**: Package manager

### Backend Setup
1. Navigate to `real-estate-server/`.
2. Install dependencies: `npm install`.
3. Create a `.env` file based on `.env.example` and add your `MONGO_URI` and `JWT_SECRET`.
4. Start development server: `npm run dev`.

### Frontend Setup
1. Navigate to `real-estate-client/`.
2. Install dependencies: `npm install`.
3. Create a `.env` file based on `.env.example` and set `VITE_API_BASE_URL`.
4. Start development server: `npm run dev`.

---

## 🛠 Available Scripts

| Location | Command | Action |
| :--- | :--- | :--- |
| **Server** | `npm run dev` | Starts the backend with hot-reload via nodemon. |
| **Server** | `npm run build` | Compiles TypeScript to production JavaScript. |
| **Client** | `npm run dev` | Starts the Vite development server. |
| **Client** | `npm run build` | Builds the frontend for production. |

---

## 📄 Documentation
For detailed requirements and business logic, refer to the [real-estate-docs](./real-estate-docs/requirements/admin/admin.requirements.md) directory.
