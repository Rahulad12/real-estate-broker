# Common Fixes Reference

## TypeScript `any` Replacements

### Pattern 1: API Response Types
**Before:**
```typescript
const data: any = response.data;
```

**After:**
```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const data: ApiResponse<MyType> = response.data;
```

### Pattern 2: MongoDB Documents
**Before:**
```typescript
const user: any = await User.findById(id);
```

**After:**
```typescript
import { Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
}

const user: IUser | null = await User.findById(id);
```

### Pattern 3: Function Parameters
**Before:**
```typescript
function processData(data: any) { ... }
```

**After:**
```typescript
function processData(data: unknown) {
  if (typeof data === 'string') { ... }
}
// or
interface ProcessDataParams {
  id: string;
  value: number;
}
function processData(data: ProcessDataParams) { ... }
```

### Pattern 4: Array Types
**Before:**
```typescript
const items: any[] = [];
```

**After:**
```typescript
const items: unknown[] = [];
// or
interface Item { id: string; }
const items: Item[] = [];
```

## Console Statement Cleanup

### Remove these (development only):
- `console.log()`
- `console.debug()`
- `console.info()`
- `console.trace()`

### Keep these (error handling):
- `console.error()` in catch blocks
- `console.warn()` for deprecation/warning messages

### Auto-fix command pattern:
```bash
# Remove console.log statements (keeping console.error and console.warn)
sed -i '/console\.log/d' file.ts
```

## Import Path Fixes

### Pattern 1: Use `@/` alias (per project standards)
**Before:**
```typescript
import { User } from '../../../types/user';
```

**After:**
```typescript
import { User } from '@/types/user';
```

### Pattern 2: Fix broken relative paths
**Before:**
```typescript
import { api } from '../apis/services/api'; // Wrong path
```

**After:**
```typescript
import { api } from '@/apis/services/api';
```

### Pattern 3: Verify file exists
If imported file doesn't exist, either:
- Create the missing file with proper exports
- Remove the import and related code
- Fix the import path to correct location

## Architecture Violations Fixes

### Issue 1: Custom component in `src/components/ui/`
**Fix:** Move to `src/components/shared/` or module folder
```bash
mv real-estate-client/src/components/ui/MyComponent.tsx real-estate-client/src/components/shared/MyComponent.tsx
```

### Issue 2: Service called directly from component
**Before:**
```typescript
// In component
const data = await propertyService.getAll();
```

**After:**
```typescript
// Create hook in src/apis/hooks/useProperties.ts
export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: () => propertyService.getAll()
  });
}

// In component
const { data } = useProperties();
```

### Issue 3: Missing module files
**Fix:** Create required files for module structure
```bash
touch src/modules/new-module/types.ts
touch src/modules/new-module/validation.ts
touch src/modules/new-module/service.ts
touch src/modules/new-module/controller.ts
```

## Lint Auto-fix Commands

### Server
```bash
cd real-estate-server && npm run lint -- --fix
```

### Client
```bash
cd real-estate-client && npm run lint -- --fix
```

## TypeScript Compilation Errors

### Common fix for "Cannot find module"
1. Check `tsconfig.json` paths configuration
2. Verify `baseUrl` and `paths` are set correctly
3. Restart TypeScript server in IDE

### Common fix for "Property does not exist"
1. Ensure interface is properly defined
2. Check for null/undefined with optional chaining
3. Add proper type guards

## Build Errors

### Vite build errors (Client)
- Check for broken imports
- Verify all dependencies are installed (`npm install`)
- Clear cache: `rm -rf node_modules/.vite`

### Express build errors (Server)
- Check for TypeScript errors first
- Verify all required environment variables exist
- Check for syntax errors in route definitions
