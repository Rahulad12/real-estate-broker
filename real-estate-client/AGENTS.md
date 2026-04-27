# Agent Styling Rules - Real Estate Client

This document defines strict styling rules that all agents MUST follow when building UI in this project.

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