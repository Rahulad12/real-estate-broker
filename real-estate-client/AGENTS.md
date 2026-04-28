# Agent Styling Rules - Real Estate Client

This document defines strict styling rules that all agents MUST follow when building UI in this project.

---

## 0. UI Component Rules (CRITICAL)

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

---

## 0.5 API Convention Rules (CRITICAL)

MUST follow `.agents/rules/api-convention.md`:

1. **TanStack Query Only**: All data fetching MUST use `@tanstack/react-query` hooks.
2. **Service Layer**: Pure API calls in `src/apis/services/` returning promises.
3. **Hooks Layer**: TanStack Query hooks in `src/apis/hooks/` wrapping services.
4. **No Direct Service Calls**: Components MUST use hooks, never services directly.
5. **Query Keys**: Use array format `[entity, ...params]` for consistent caching.

---

## 1. Color System (CSS Variables Only)

Use Tailwind classes that map to these CSS variables. NEVER use arbitrary hex/RGB values.

| Token | Light Mode Value | Usage |
|-------|-----------------|-------|
| `text-primary` | `#037171` (teal) | **ALL main headings only** |
| `text-secondary` | `#d98324` (amber) | Sub-headings, labels, badges, links |
| `text-secondary-foreground` | Body text | Descriptions, helper text |
| `text-muted-foreground` | Muted text | Placeholders, captions |
| `text-button-hover` | `#d9ba20` (gold) | Hover states on buttons |
| `bg-background` | White | Page background |
| `bg-card` | White | Card background |
| `border-border` | Gray | Borders, dividers |

---

## 2. Typography Rules

### Headings
- **Main Heading (H1)**: `text-primary` with `font-semibold`
  - Page headers: `text-2xl` or `text-[32px]`
  - Card titles: `text-base font-medium font-heading`
- **Sub-heading/Caption**: ALWAYS use:
  ```tsx
  <p className="text-[10px] tracking-[0.2em] uppercase text-secondary">
    Your sub heading
  </p>
  ```
- **Description text**: Below headings:
  ```tsx
  <p className="text-sm text-secondary-foreground font-light">
    Description text
  </p>
  ```

### Font Families
- Headings: `font-heading` (already configured in index.css)
- Body: Default sans-serif

---

## 3. Page Spacing (STANDARD - ALL pages must follow)

### Full-page centered layout:
```tsx
<div className="min-h-screen flex items-center justify-center bg-background px-4">
  {/* content */}
</div>
```

### Page with vertical padding:
```tsx
<div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
  {/* content */}
</div>
```

---

## 4. Card Styling (STANDARD - ALL cards must follow)

### Card Container:
```tsx
<Card className="w-full max-w-md bg-background/95 rounded-xl px-6 py-8 shadow-xl">
```

### CardHeader:
```tsx
<CardHeader className="mb-6 space-y-2">
```

### CardContent:
```tsx
<CardContent>
  <form className="space-y-6" noValidate>
```

---

## 5. Form Spacing (STANDARD - ALL forms must follow)

| Element | Class |
|---------|-------|
| Form wrapper | `space-y-6` |
| Field wrapper | `space-y-4` |
| Inline fields (grid) | `grid grid-cols-1 sm:grid-cols-2 gap-4` |
| Label | `mb-2` (for stacked) or inline |
| Error message | `mt-1.5 text-xs text-red-400` |
| Submit button | `h-10` |

---

## 6. Card Component Defaults

The Card component has built-in styles. DO NOT override these:

```tsx
// Default Card
<Card>
// py-4, px-4, rounded-xl, gap-4, bg-card

// Small Card
<Card size="sm">
// py-3, px-3, gap-3

// Card sub-components use correct spacing by default
<CardHeader />
<CardContent />
<CardFooter />
<CardTitle />    // text-base font-medium font-heading
<CardDescription />  // text-sm text-muted-foreground
```

---

## 7. Button Styling

| Variant | Usage |
|---------|-------|
| Default | Primary action button |
| `variant="link"` | Text links, "Forgot password?" etc. |
| `className="h-10"` | Standard button height |
| Loading state | `<Loader2 size={14} className="animate-spin" />` |

---

## 8. Input Styling

Use the `inputCls` utility from `@/lib/input-class-builder`:
```tsx
import inputCls from "@/lib/input-class-builder";
<Input className={inputCls(!!errors.fieldName)} />
```

Height for standard inputs: `h-11`

---

## 9. Icons

- Size 15-16px for form icons
- Size 14px for loading spinners
- Position: `absolute left-3.5 top-1/2 -translate-y-1/2`
- Color: `text-zinc-500 pointer-events-none`

---

## 10. Checklist Before Finishing

- [ ] All headings use `text-primary`
- [ ] All sub-headings use `text-secondary` with `tracking-[0.2em] uppercase`
- [ ] Page uses standard page spacing classes
- [ ] Card uses standard card classes
- [ ] Form uses `space-y-6` for field spacing
- [ ] Only CSS variable-based colors are used
- [ ] No arbitrary hex values in className

---

## 11. Component Architecture Mandates (CRITICAL)

Agents MUST follow these rules when implementing any feature:

1. **Re-render Analysis**: When implementing any feature, you MUST strictly check for unnecessary re-renders. If a component causes re-renders in other components, extract it into a separate component.
2. **Reusable Components**: Create a separate component ONLY if it will be reused. Do not over-engineer with premature abstraction.
3. **Shared Components**: Global/reusable frontend components that are used across multiple modules MUST be placed in `src/components/shared/` folder.
4. **Module Components**: Components specific to a feature module should stay within `src/modules/your-module/components/`.
5. **useEffect Restrictions**: AVOID using `useEffect` unless absolutely necessary. Prefer:
   - Direct data transformations in render
   - Event handlers for user interactions
   - TanStack Query for data fetching
   - `useMemo`/`useCallback` for expensive computations
   - Only use `useEffect` for side effects that cannot be handled by the above (e.g., subscriptions, timers, manual DOM manipulation).

---

## 12. Performance Checklist (MANDATORY for all implementations)

Agents MUST complete this checklist before finishing any implementation:

- [ ] Checked for unnecessary re-renders using React DevTools or similar
- [ ] Extracted components causing re-renders in parent/sibling components
- [ ] Placed reusable global components in `src/components/shared/`
- [ ] Avoided `useEffect` unless necessary (document reason in comments)
- [ ] Used `useMemo`/`useCallback` for expensive operations
- [ ] Verified component renders only when its own state/props change