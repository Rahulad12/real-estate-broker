---
name: test-and-build
description: Runs comprehensive code quality checks (TypeScript any, console logs, path errors, architecture compliance), auto-fixes issues, and builds the project. Use this skill to validate and prepare the project for deployment.
---

# Test and Build

This skill performs comprehensive code quality validation, automatically fixes issues, and builds the project. It ensures the codebase follows project architecture mandates and is production-ready.

## Workflow

### Phase 1: TypeScript `any` Type Detection

1. **Scan for `any` usage** in both client and server:
   ```bash
   # Server
   grep -r ": any\|<any>\|any\[\]\|as any" real-estate-server/src --include="*.ts"
   # Client
   grep -r ": any\|<any>\|any\[\]\|as any" real-estate-client/src --include="*.ts" --include="*.tsx"
   ```

2. **Auto-fix strategy**:
   - For simple cases, replace `any` with `unknown` and add type guards
   - For API responses, create proper interfaces/types
   - For MongoDB documents, use Mongoose's `Document` type or proper interface
   - If cannot determine type, use `unknown` with TODO comment for later refinement

3. **Common replacements**:
   - `any` → `unknown` (with type guard)
   - `any[]` → `unknown[]` or specific type array
   - `: any` in function params → define proper interface

### Phase 2: Unused Console Detection

1. **Scan for console statements** (excluding test files and specific debug utilities):
   ```bash
   # Find console.log, console.error, etc.
   grep -r "console\." real-estate-server/src --include="*.ts" | grep -v "console\.error\|console\.warn"
   grep -r "console\." real-estate-client/src --include="*.ts" --include="*.tsx" | grep -v "console\.error\|console\.warn"
   ```

2. **Auto-remove**: Delete all found console statements (except `console.error` and `console.warn` in error handling contexts).

3. **Preserve**: Keep `console.error` in catch blocks and error middleware, `console.warn` for deprecation warnings.

### Phase 3: Path Error Detection

1. **Check import paths**:
   - Verify `@/` alias resolves correctly in both client and server
   - Check for broken relative paths
   - Ensure imported files exist

2. **Auto-fix**:
   - Correct relative path mismatches
   - Update imports to use `@/` alias where appropriate (per project standards)
   - Remove imports for non-existent files

3. **Validation commands**:
   ```bash
   # TypeScript compilation check (catches path errors)
   cd real-estate-server && npx tsc --noEmit
   cd real-estate-client && npx tsc --noEmit
   ```

### Phase 4: Architecture Compliance Check

Run architecture validation for both server and client:

#### Server Architecture Check
- [ ] Each module in `src/modules/` has: `routes`, `controller`, `service`, `schema`, `validation`, `types`
- [ ] Controllers use try-catch and pass errors to middleware
- [ ] Services contain business logic (not in controllers)
- [ ] Schemas defined in `schema` folder with Zod
- [ ] Consistent response format: `{ "success": true, "message": "...", "data": ... }`
- [ ] MongoDB connection in `src/config/db.ts`

#### Client Architecture Check
- [ ] Feature modules in `src/modules/` with own components, pages, types
- [ ] Shadcn components ONLY in `src/components/ui/` (check for custom components there)
- [ ] Custom reusable components in `src/components/shared/`
- [ ] Module-specific components in `src/modules/<feature>/components/`
- [ ] API hooks in `src/apis/hooks/` (never call services directly from components)
- [ ] API services in `src/apis/services/` (pure API calls only)
- [ ] TanStack Query used for data fetching (check API convention in `.agents/rules/api-convention.md`)
- [ ] No `useEffect` without justification (check for comments explaining why)

#### Component Architecture Check
- [ ] Reusable components that are used across modules are in `src/components/shared/`
- [ ] No over-engineering: components extracted only if reused
- [ ] Module-specific components stay within their module folder

### Phase 5: Auto-Fix Architecture Violations

1. **Move misplaced components**:
   - Custom components in `src/components/ui/` → move to `src/components/shared/` or module folder
   - Reusable components not in `shared/` → move them

2. **Fix API convention violations**:
   - If services called directly from components → create TanStack Query hook
   - If hooks not in `src/apis/hooks/` → move them

3. **Add missing module files**:
   - If module missing `types.ts` → create with proper interfaces
   - If module missing `validation.ts` → create with Zod schemas

### Phase 6: Linting and Formatting

1. **Server linting and formatting**:
   ```bash
   cd real-estate-server && npm run lint
   cd real-estate-server && npm run format
   ```

2. **Client linting**:
   ```bash
   cd real-estate-client && npm run lint
   ```

3. **Fix auto-fixable lint errors**:
   - Run lint with `--fix` flag if available
   - Manually fix remaining errors

### Phase 7: TypeScript Compilation Check

1. **Type check both projects**:
   ```bash
   cd real-estate-server && npx tsc --noEmit
   cd real-estate-client && npx tsc --noEmit
   ```

2. **Fix type errors**:
   - Iterate until no TypeScript errors remain
   - Document any intentional `// @ts-ignore` with reason

### Phase 8: Build Projects

1. **Build server** (if applicable):
   ```bash
   cd real-estate-server && npm run build
   ```

2. **Build client**:
   ```bash
   cd real-estate-client && npm run build
   ```

3. **Handle build errors**:
   - If build fails, analyze error, fix, and retry
   - Maximum 3 retry attempts with fixes

### Phase 9: Success Signal

After successful build, output a clear success message:

```
✅ ===============================
   PROJECT IS FINE AND READY
==================================

✓ TypeScript `any` types: Fixed
✓ Console statements: Cleaned
✓ Import paths: Validated
✓ Architecture: Compliant
✓ Linting: Passed
✓ TypeScript: Compiled
✓ Build: Successful

Ready for deployment!
==================================
```

## Error Handling

- **If issues found and fixed**: Re-run Phase 1-7 to verify fixes
- **If build fails after 3 attempts**: Report issues to user with detailed error log
- **If architecture violations cannot be auto-fixed**: List them for manual review

## Iteration

After fixing issues, the skill should re-run all checks (Phase 1-7) to ensure:
1. Fixes didn't introduce new issues
2. All original issues are resolved
3. Project is truly production-ready

Maximum 3 full iteration cycles to prevent infinite loops.

## Notes

- Never commit changes unless user explicitly requests
- This skill focuses on validation and build, not feature implementation
- Use `npm run lint` and `npm run build` as defined in each project's `package.json`
- Check `.env` files are not committed (warn if found in staging area)
