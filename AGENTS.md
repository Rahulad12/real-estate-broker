# Project Documentation - Real Estate
This document provides foundational mandates and architectural guidance for agents working on the Real Estate project.

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
- **UI Components**: 
  - Use Shadcn components from `src/components/ui/` (initialized via `npx shadcn@latest add <component>`)
  - ALWAYS check Shadcn UI first before creating custom components
  - `src/components/ui/` is RESERVED for Shadcn components only - NEVER create custom components there
  - Custom reusable components go in `src/components/shared/`
  - Module-specific components go in `src/modules/<feature>/components/`
- **Styling**: Tailwind CSS 4. Use `cn` utility for class merging.
- **Data Fetching (CRITICAL)**: 
  - MUST follow API convention rules in `.agents/rules/api-convention.md`
  - Use TanStack Query hooks in `src/apis/hooks/` for all data fetching
  - Services in `src/apis/services/` for pure API calls only
  - NEVER call services directly from components
- **Routing**: React Router 7 in `src/routes/`.
- **Forms**: React Hook Form with Zod resolvers.

### Component Architecture Mandates (CRITICAL)
1. **Re-render Analysis**: When implementing any feature, you MUST strictly check for unnecessary re-renders. If a component causes re-renders in other components, extract it into a separate component.
2. **Reusable Components**: Create a separate component ONLY if it will be reused. Do not over-engineer with premature abstraction.
3. **Shared Components**: Global/ reusable frontend components that are used across multiple modules MUST be placed in `src/components/shared/` folder.
4. **Module Components**: Components specific to a feature module should stay within `src/modules/your-module/components/`.
5. **useEffect Restrictions**: AVOID using `useEffect` unless absolutely necessary. Prefer:
   - Direct data transformations in render
   - Event handlers for user interactions
   - TanStack Query for data fetching
   - `useMemo`/`useCallback` for expensive computations
   - Only use `useEffect` for side effects that cannot be handled by the above (e.g., subscriptions, timers, manual DOM manipulation).

### Performance Checklist (MANDATORY for all implementations)
- [ ] Checked for unnecessary re-renders using React DevTools or similar
- [ ] Extracted components causing re-renders in parent/sibling components
- [ ] Placed reusable global components in `src/components/shared/`
- [ ] Avoided `useEffect` unless necessary (document reason in comments)
- [ ] Used `useMemo`/`useCallback` for expensive operations
- [ ] Verified component renders only when its own state/props change

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
