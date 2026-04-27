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
