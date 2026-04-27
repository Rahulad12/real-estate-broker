# Architectural Rules

## Backend (real-estate-server)
- **Module-Based**: New features must be encapsulated in `src/modules/<feature-name>/`.
- **Module Structure**: Every module must follow this internal layout:
  ```
  src/modules/<feature-name>/
    <feature>.controller.ts   ← request/response handling
    <feature>.service.ts      ← business logic
    <feature>.schema.ts       ← Mongoose model/schema
    <feature>.routes.ts       ← Express route definitions
    <feature>.validation.ts   ← Zod or express-validator schemas
    <feature>.types.ts        ← TypeScript interfaces and types
  ```
- **Shared Infrastructure** (not feature-specific) stays at `src/` level:
  ```
  src/
    config/       ← DB, env, third-party config
    middleware/   ← global middleware (auth, error handler, upload, etc.)
    utils/        ← pure utility functions reused across modules
    app.ts        ← Express app setup and route registration
  ```
- **Layered Pattern Within Module**: Strictly follow `Routes -> Controller -> Service -> Schema`.
- **Statelessness**: The API must remain stateless, using JWT for authentication.
- **Validation Layer**: All incoming requests must be validated in `<feature>.validation.ts` before reaching the service layer.
- **Error Handling**: Use the centralized `error.middleware.ts`. Services should throw errors with status codes when possible.

## Frontend (real-estate-client)
- **Module-Based**: New features must be encapsulated in `src/modules/<feature-name>`.
- **Module Structure**: Every module must follow this internal layout:
  ```
  src/modules/<feature-name>/
    component/
      custom/      ← presentational/functional components for this module only
      skeleton/    ← skeleton/loading state components
    page/          ← route-level page components
    types/         ← TypeScript interfaces and types
    validation-schema/ ← Zod schemas for forms
  ```
- **Component Placement**:
  - Default: create components inside `component/custom/` or `component/skeleton/` of the owning module.
  - Promote to `src/components/shared/` **only** when a component is confirmed to be used by more than one module.
  - Never create a component in `shared/` speculatively.
- **Logic Separation**: Keep UI components (in `component/`) separate from business logic (in `page/` or TanStack Query hooks).
- **Data Fetching**: All API calls must go through TanStack Query hooks defined in `src/apis/hooks/`.
- **State Management**: Prefer local state or TanStack Query cache. Avoid global state providers unless absolutely necessary.
