# Coding Standards

## TypeScript
- **Strict Mode**: Maintain `strict: true` in `tsconfig.json`.
- **Explicit Types**: Avoid `any`. Use interfaces for object shapes and `type` for unions/aliases.
- **Return Types**: Always define return types for exported functions and API services.

## Naming Conventions
- **Components**: PascalCase (e.g., `PropertyCard.tsx`).
- **Files/Folders**: kebab-case (e.g., `auth-hooks.ts`).
- **Variables/Functions**: camelCase.
- **Interfaces**: Prefix with `I` (e.g., `IUser`) or use clear descriptive names.

## Styling (Tailwind CSS 4)
- **Utility First**: Use Tailwind utility classes.
- **Dynamic Classes**: Use the `cn()` utility from `src/lib/utils.ts` for conditional class merging.
- **Organization**: Keep classes in a logical order (layout -> spacing -> typography -> colors).

## UI Component Rules (CRITICAL)
1. **Shadcn Priority**: ALWAYS check Shadcn UI first. Use Shadcn components when available (Button, Card, Input, Table, Dialog, DropdownMenu, etc.).
2. **components/ui/ Directory**: 
   - This directory is RESERVED for Shadcn initialized components only
   - NEVER create custom UI components in `src/components/ui/`
   - Shadcn components are added via `npx shadcn@latest add <component>` command
3. **Custom Components**: Only create custom components if Shadcn doesn't provide the required UI element.

## Component Architecture (CRITICAL)
- **Re-render Analysis**: When implementing any feature, you MUST strictly check for unnecessary re-renders. If a component causes re-renders in other components, extract it into a separate component.
- **Reusable Components**: Create a separate component ONLY if it will be reused. Do not over-engineer with premature abstraction.
- **Shared Components**: Global/reusable frontend components that are used across multiple modules MUST be placed in `src/components/shared/` folder.
- **Module Components**: Components specific to a feature module should stay within `src/modules/<feature-name>/components/`.
- **UI Components**: Use Shadcn from `src/components/ui/`, never create custom UI components there.

## useEffect Restrictions
- AVOID using `useEffect` unless absolutely necessary. Prefer:
  - Direct data transformations in render
  - Event handlers for user interactions
  - TanStack Query for data fetching
  - `useMemo`/`useCallback` for expensive computations
  - Only use `useEffect` for side effects that cannot be handled by the above (e.g., subscriptions, timers, manual DOM manipulation).

## Performance Checklist (MANDATORY)
Before completing any implementation, verify:
- [ ] Checked for unnecessary re-renders using React DevTools or similar
- [ ] Extracted components causing re-renders in parent/sibling components
- [ ] Placed reusable global components in `src/components/shared/`
- [ ] Avoided `useEffect` unless necessary (document reason in comments)
- [ ] Used `useMemo`/`useCallback` for expensive operations
- [ ] Verified component renders only when its own state/props change
