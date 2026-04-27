# Gemini CLI Project Documentation - Real Estate
This document provides foundational mandates and architectural guidance for Gemini CLI agents working on the Real Estate project.

## Project Overview
A full-stack real estate listing platform.
- **Client**: React 19, Vite, TypeScript, Tailwind CSS 4, TanStack Query, React Router 7.
- **Server**: Node.js, Express 5, TypeScript, Mongoose (MongoDB).

## Directory Structure
- `real-estate-client/`: Frontend application.
- `real-estate-server/`: Backend API.
- `.agents/`: Agent configuration, rules, and taskboard.

## Core Mandates & Standards

### Workflow Mandate: Milestone & Issue-First Development
We strictly follow a "Plan Before Action" workflow. No implementation should begin without updating the roadmap.
1. **Requirement Analysis**: Analyze the scope and break it down into milestones and tasks.
2. **Milestone Update**: Update `.agents/taskboard/milestones.md` with new/updated milestones.
3. **Task Update**: Update `.agents/taskboard/todo.md` with granular tasks.
4. **Remote Sync**: Create corresponding issues on GitHub (using `gh issue create`) and link them to the relevant milestone.
5. **Implementation**: Only begin implementation after the above synchronization is complete.
6. **Validation & Closure**: Verify changes with tests/linting, then close GitHub issues and mark local tasks as completed.

### General
- **Imports**: Use `@/` alias for absolute imports in both client and server.
- **Types**: Always use TypeScript. Prefer interfaces for object shapes and types for unions/intersections.
- **Validation**: Use Zod for schema validation on both frontend and backend.
- **Linting**: Run `npm run lint` in the respective directory after changes.
- **Formatting**: Server uses Prettier (`npm run format`). Client uses ESLint for formatting.

### Backend (`real-estate-server/`)
- **Architecture**: Module-based approach in `src/modules/`.
  - Each module is self-contained: `routes`, `controller`, `service`, `schema`, `validation`, and `types`.
- **Responses**: Consistent JSON format:
  ```json
  { "success": true, "message": "...", "data": ... }
  ```
- **Error Handling**: Use `try-catch` in controllers and pass errors to the error middleware or handle them with status codes.
- **Database**: Mongoose (MongoDB). Connection managed in `src/config/db.ts`.

### Frontend (`real-estate-client/`)
- **Architecture**: Feature-based modules in `src/modules/`.
- **UI Components**: Use Radix UI / Shadcn primitives in `src/components/ui/`.
- **Styling**: Tailwind CSS 4. Use `cn` utility for class merging.
- **Data Fetching**: Use TanStack Query hooks in `src/apis/hooks/`. Services in `src/apis/services/`.
- **Routing**: React Router 7 in `src/routes/`.
- **Forms**: React Hook Form with Zod resolvers.

## Common Workflows

### Adding a New API Entity (Server)
1. Create module folder: `src/modules/new-entity/`.
2. Define Types: `new-entity.types.ts`.
3. Create Schema: `new-entity.schema.ts`.
4. Implement Service: `new-entity.service.ts`.
5. Implement Validation: `new-entity.validation.ts`.
6. Implement Controller: `new-entity.controller.ts`.
7. Define Routes: `new-entity.routes.ts`.
8. Register Route in `src/app.ts`.

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
- Server: `MONGO_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL`
