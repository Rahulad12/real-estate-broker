# Architectural Rules

## Backend (real-estate-server)
- **Layered Pattern**: Strictly follow `Routes -> Controllers -> Services -> Models`.
- **Statelessness**: The API must remain stateless, using JWT for authentication.
- **Validation Layer**: All incoming requests must be validated using Zod or `express-validator` before reaching the service layer.
- **Error Handling**: Use the centralized `error.middleware.ts`. Services should throw errors with status codes when possible.

## Frontend (real-estate-client)
- **Module-Based**: New features must be encapsulated in `src/modules/<feature-name>`.
- **Logic Separation**: Keep UI components (in module/component) separate from business logic (in module/page or hooks).
- **Data Fetching**: All API calls must go through TanStack Query hooks defined in `src/apis/hooks/`.
- **State Management**: Prefer local state or TanStack Query cache. Avoid global state providers unless absolutely necessary.
