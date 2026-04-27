# Gemini CLI Project Documentation - Real Estate
This document provides foundational mandates and architectural guidance for Gemini CLI agents working on the Real Estate project.

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
- **Architecture**: Feature-based modules in `src/modules/<feature-name>/`. Each module owns its controller, service, schema, routes, validation, and types.
- **Layered Pattern Within Module**: Routes → Controller → Service → Schema.
- **Responses**: Consistent JSON format:
  ```json
  { "success": true, "message": "...", "data": ... }
  ```
- **Error Handling**: Use `try-catch` in controllers and pass errors to the centralized `error.middleware.ts`.
- **Validation**: Define Zod or `express-validator` schemas in `<feature>.validation.ts` inside the module.
- **Shared Infrastructure**: `src/config/`, `src/middleware/`, `src/utils/` — for cross-module concerns only.

### Frontend (`real-estate-client/`)
- **Architecture**: Feature-based modules in `src/modules/`.
- **UI Components**: Use Radix UI / Shadcn primitives in `src/components/ui/`.
- **Component Placement**:
  - Components reused across **multiple modules** → place in `src/components/shared/`.
  - Components used **only within a single module** → place inside `src/modules/<module-name>/component/`. Do not extract to shared unless cross-module reuse is confirmed.
- **Styling**: Tailwind CSS 4. Use `cn` utility for class merging.
- **Data Fetching**: Use TanStack Query hooks in `src/apis/hooks/`. Services in `src/apis/services/`.
- **Routing**: React Router 7 in `src/routes/`.
- **Forms**: React Hook Form with Zod resolvers.

## Common Workflows

### Adding a New API Entity (Server)
Each feature lives in `src/modules/<feature-name>/` and must follow this internal structure:

```
src/modules/<feature-name>/
  <feature>.controller.ts   ← request/response handling
  <feature>.service.ts      ← business logic
  <feature>.schema.ts       ← Mongoose model/schema
  <feature>.routes.ts       ← Express route definitions
  <feature>.validation.ts   ← Zod or express-validator schemas
  <feature>.types.ts        ← TypeScript interfaces and types
```

Steps:
1. Create `src/modules/<feature-name>/` with the structure above.
2. Define types in `<feature>.types.ts`.
3. Create the Mongoose schema in `<feature>.schema.ts`.
4. Implement business logic in `<feature>.service.ts`.
5. Implement request handling in `<feature>.controller.ts`.
6. Define routes in `<feature>.routes.ts`.
7. Register the module router in `src/app.ts`.

Shared infrastructure (auth middleware, error handler, DB config, utilities) stays in `src/middleware/`, `src/config/`, and `src/utils/` — not inside any module.

### Adding a New Module (Client)
Each module lives in `src/modules/<module-name>/` and must follow this internal structure:

```
src/modules/<module-name>/
  component/          ← UI components used only within this module
    custom/           ← functional/presentational components
    skeleton/         ← loading skeleton variants
  page/               ← route-level page components
  types/              ← TypeScript interfaces and types for this module
  validation-schema/  ← Zod schemas for forms in this module
```

Steps:
1. Create the folder with the structure above.
2. Keep all components inside `component/` unless another module needs them.
3. Only move a component to `src/components/shared/` when cross-module reuse is confirmed.
4. Add API service in `src/apis/services/`.
5. Add Query hooks in `src/apis/hooks/`.
6. Register routes in `src/routes/app-router.tsx`.

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
