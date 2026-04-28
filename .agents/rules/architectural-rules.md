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

### UI Component Rules (CRITICAL)
1. **Shadcn Priority**: ALWAYS check Shadcn UI first. Use Shadcn components when available (Button, Card, Input, Table, Dialog, DropdownMenu, etc.).
2. **components/ui/ Directory**: 
   - This directory is RESERVED for Shadcn initialized components only
   - NEVER create custom UI components in `src/components/ui/`
   - Shadcn components are added via `npx shadcn@latest add <component>` command
3. **Custom Components**: Only create custom components if Shadcn doesn't provide the required UI element.
4. **Component Hierarchy**:
   - `src/components/ui/` ← Shadcn components only (initialized via shadcn CLI)
   - `src/components/shared/` ← Custom reusable components used across multiple modules
   - `src/modules/<feature>/components/` ← Module-specific components

### Component Architecture Mandates (CRITICAL)
1. **Re-render Analysis**: When implementing any feature, you MUST strictly check for unnecessary re-renders. If a component causes re-renders in other components, extract it into a separate component.
2. **Reusable Components**: Create a separate component ONLY if it will be reused. Do not over-engineer with premature abstraction.
3. **Shared Components**: Global/reusable frontend components that are used across multiple modules MUST be placed in `src/components/shared/` folder.
4. **Module Components**: Components specific to a feature module should stay within `src/modules/<feature-name>/components/`.
5. **useEffect Restrictions**: AVOID using `useEffect` unless absolutely necessary. Prefer:
   - Direct data transformations in render
   - Event handlers for user interactions
   - TanStack Query for data fetching
   - `useMemo`/`useCallback` for expensive computations
   - Only use `useEffect` for side effects that cannot be handled by the above (e.g., subscriptions, timers, manual DOM manipulation).

### Component Placement Rules
- Default: create components inside `component/custom/` or `component/skeleton/` of the owning module.
- Promote to `src/components/shared/` **only** when a component is confirmed to be used by more than one module.
- Never create a component in `shared/` speculatively.
- NEVER create custom components in `src/components/ui/` - use Shadcn CLI to add components there.

### Logic Separation
- Keep UI components (in `component/`) separate from business logic (in `page/` or TanStack Query hooks).

### Data Fetching
- All API calls must go through TanStack Query hooks defined in `src/apis/hooks/`.

### State Management
- Prefer local state or TanStack Query cache. Avoid global state providers unless absolutely necessary.

### Performance Checklist (MANDATORY for all implementations)
Before marking any implementation as complete, verify:
- [ ] Checked for unnecessary re-renders using React DevTools or similar
- [ ] Extracted components causing re-renders in parent/sibling components
- [ ] Placed reusable global components in `src/components/shared/`
- [ ] Avoided `useEffect` unless necessary (document reason in comments)
- [ ] Used `useMemo`/`useCallback` for expensive operations
- [ ] Verified component renders only when its own state/props change
