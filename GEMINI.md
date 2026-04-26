# Gemini CLI Project Documentation - Techkraft Real Estate

This document provides foundational mandates and architectural guidance for Gemini CLI agents working on the Techkraft Real Estate project.

## Project Overview
A full-stack real estate listing platform.
- **Client**: React 19, Vite, TypeScript, Tailwind CSS 4, TanStack Query, React Router 7.
- **Server**: Node.js, Express 5, TypeScript, Mongoose (MongoDB).

## Directory Structure
- `real-estate-client/`: Frontend application.
- `real-estate-server/`: Backend API.

## Core Mandates & Standards

### Workflow Mandate: Issue-First Development
- **Requirement Analysis**: For every new requirement or change, first analyze the scope and break it down.
- **Remote Sync**: Create corresponding issues on GitHub (using `gh issue create`) and link them to the relevant milestone.
- **Local Sync**: Update `.gemini/taskboard/milestones.md` and `todo.md` with the new tasks and their GitHub issue IDs.
- **Implementation**: Only begin implementation after the above synchronization is complete.
- **Closure**: Close issues on GitHub and mark local tasks as completed once the feature/fix is verified and linted.

### General
- **Imports**: Use `@/` alias for absolute imports in both client and server.
- **Types**: Always use TypeScript. Prefer interfaces for object shapes and types for unions/intersections.
- **Validation**: Use Zod for schema validation on both frontend and backend.
- **Linting**: Run `npm run lint` in the respective directory after changes.
- **Formatting**: Server uses Prettier (`npm run format`). Client uses ESLint for formatting.

### Backend (`real-estate-server/`)
- **Architecture**: Layered approach (Routes -> Controllers -> Services -> Models).
- **Responses**: Consistent JSON format:
  ```json
  { "success": true, "message": "...", "data": ... }
  ```
- **Error Handling**: Use `try-catch` in controllers and pass errors to the error middleware or handle them with status codes.
- **Models**: Located in `src/model/` (named `*-schema.ts`).
- **Services**: Business logic stays in `src/services/`.
- **Validation**: Use `express-validator` or Zod in middleware.

### Frontend (`real-estate-client/`)
- **Architecture**: Feature-based modules in `src/modules/`.
- **UI Components**: Use Radix UI / Shadcn primitives in `src/components/ui/`.
- **Styling**: Tailwind CSS 4. Use `cn` utility for class merging.
- **Data Fetching**: Use TanStack Query hooks in `src/apis/hooks/`. Services in `src/apis/services/`.
- **Routing**: React Router 7 in `src/routes/`.
- **Forms**: React Hook Form with Zod resolvers.

## Common Workflows

### Adding a New API Entity (Server)
1. Define Types: `src/types/entity.types.ts`.
2. Create Schema: `src/model/entity-schema.ts`.
3. Implement Service: `src/services/entity.service.ts`.
4. Implement Controller: `src/controllers/entity.controller.ts`.
5. Define Routes: `src/routes/entity.routes.ts`.
6. Register Route: `src/app.ts`.

### Adding a New Module (Client)
1. Create folder in `src/modules/new-module/`.
2. Define components, pages, and types within the module folder.
3. Add API service in `src/apis/services/`.
4. Add Query hooks in `src/apis/hooks/`.
5. Register routes in `src/routes/app-router.tsx`.

## Commands

### Server
- `npm run dev`: Start development server.
- `npm run lint`: Lint code.
- `npm run format`: Format code with Prettier.
- `npm run build`: Build for production.

### Client
- `npm run dev`: Start Vite dev server.
- `npm run lint`: Lint code.
- `npm run build`: Build for production.

## Environment Variables
Ensure `.env` files are updated when adding new external dependencies or configurations. Never commit `.env` files.
- Client: `VITE_API_BASE_URL`
- Server: `MONGO_URI`, `JWT_SECRET`, `PORT`
