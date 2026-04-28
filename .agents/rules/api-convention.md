# API Convention Rules (CRITICAL)

All API calls in the Real Estate client application MUST follow these conventions. Agents MUST adhere to this structure when adding new API endpoints.

---

## 1. Architecture Overview

API layer is split into three distinct layers:

```
src/apis/
├── axiosInstance.ts          ← Axios instance with interceptors
├── auth.ts                   ← Auth utility functions
├── services/                 ← Service layer (pure API calls)
│   ├── auth.services.ts
│   ├── property.service.ts
│   ├── admin.service.ts
│   └── [entity].service.ts  ← New services here
└── hooks/                    ← TanStack Query hooks
    ├── auth.hooks.ts
    ├── property.hooks.ts
    ├── admin.hooks.ts
    └── [entity].hooks.ts     ← New hooks here
```

---

## 2. Service Layer Rules (`src/apis/services/`)

### Purpose
- Make HTTP requests using `axiosInstance`
- Return axios promises (DO NOT await or execute)
- Handle request parameters and path variables

### Rules
1. **Pure Functions**: Services must only make API calls and return promises. No data transformation.
2. **Named Exports**: Use `export const` for each service function.
3. **Consistent Naming**: Use `[action][Entity]Service` pattern (e.g., `getPropertyService`, `loginUserService`).
4. **TypeScript**: Always type parameters and use proper TypeScript types.

### Service Template
```typescript
import axiosInstance from "../axiosInstance";
import type { SomeType } from "@/modules/some-module/types";

// GET request with optional params
export const getEntitiesService = (params?: SomeQueryParams) => {
  return axiosInstance.get("/endpoint", { params });
};

// GET request by ID
export const getEntityByIdService = (id: string) => {
  return axiosInstance.get(`/endpoint/${id}`);
};

// POST request
export const createEntityService = (payload: CreateEntityDto) => {
  return axiosInstance.post("/endpoint", payload);
};

// PUT request
export const updateEntityService = (id: string, payload: UpdateEntityDto) => {
  return axiosInstance.put(`/endpoint/${id}`, payload);
};

// DELETE request
export const deleteEntityService = (id: string) => {
  return axiosInstance.delete(`/endpoint/${id}`);
};

// POST with skipAuthRefresh (for auth endpoints)
export const loginService = (payload: LoginDto) => {
  return axiosInstance.post("/auth/login", payload, {
    skipAuthRefresh: true
  });
};
```

---

## 3. Hooks Layer Rules (`src/apis/hooks/`)

### Purpose
- Wrap services with TanStack Query hooks
- Handle query keys for caching
- Manage mutation success/error callbacks
- Provide typed data to components

### Rules
1. **MUST Use TanStack Query**: All data fetching MUST use `@tanstack/react-query`.
2. **useQuery for GET**: Use `useQuery` for all GET requests.
3. **useMutation for POST/PUT/DELETE**: Use `useMutation` for all write operations.
4. **Query Keys**: Use array format `[entity-name, ...params]` for query keys.
5. **Named Exports**: Use `export const use[Action][Entity]` pattern.
6. **Type Safety**: Define proper TypeScript types for query functions.

### Hooks Template
```typescript
import { useQuery, useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import {
  getEntitiesService,
  getEntityByIdService,
  createEntityService,
} from "../services/entity.service";
import type { Entity, EntityWithPaginationResponse } from "@/modules/entity/types";

// Query hook for list with pagination
export const useGetEntities = (params?: QueryParams) => {
  return useQuery({
    queryKey: ["entities", params],
    queryFn: async () => {
      const response: AxiosResponse<EntityWithPaginationResponse> =
        await getEntitiesService(params);
      return response.data.data;
    },
  });
};

// Query hook for single entity
export const useGetEntityById = (id?: string) => {
  return useQuery({
    queryKey: ["entity", id],
    queryFn: async () => {
      if (!id) throw new Error("ID is required");
      const response: AxiosResponse<{ success: boolean; data: Entity }> =
        await getEntityByIdService(id);
      return response.data.data;
    },
    enabled: !!id, // Only run query if ID is provided
  });
};

// Mutation hook for creating entity
export const useCreateEntity = () => {
  return useMutation({
    mutationFn: async (payload: CreateEntityDto) => {
      const response = await createEntityService(payload);
      return response.data;
    },
    onSuccess(data) {
      // Handle success (toast, redirect, etc.)
      toast.success(data?.message);
    },
    onError(error: AxiosError<{ message: string }>) {
      toast.error(error.response?.data?.message || "Operation failed");
    },
  });
};
```

---

## 4. Axios Instance (`src/apis/axiosInstance.ts`)

### Configuration
- Base URL from environment config
- Timeout: 10 seconds
- Default headers: `Content-Type: application/json`
- Request interceptor: Attach bearer token
- Response interceptor: Handle 401 with token refresh

### Usage
```typescript
import axiosInstance from "../axiosInstance";

// In services, always use axiosInstance, never raw axios
export const someService = () => {
  return axiosInstance.get("/endpoint");
};
```

---

## 5. Auth Utilities (`src/apis/auth.ts`)

### Purpose
- Token management (get, set, clear)
- Authentication status checks
- Silent login with refresh token

### Rules
- Use localStorage for token storage
- Export as a service object
- Keep it separate from API services

---

## 6. Import/Export Conventions

### Services
```typescript
// In service files
import axiosInstance from "../axiosInstance";
import type { SomeType } from "@/modules/some-module/types";

export const someService = () => { ... };
```

### Hooks
```typescript
// In hooks files
import { useQuery, useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { someService } from "../services/some.service";
import type { SomeType } from "@/modules/some-module/types";

export const useSomeQuery = () => { ... };
```

### Components
```typescript
// In components/pages
import { useSomeQuery, useSomeMutation } from "@/apis/hooks/some.hooks";
// OR use barrel export if available
import { useSomeQuery } from "@/apis";
```

---

## 7. Checklist for Adding New API Endpoint

- [ ] Create service function in `src/apis/services/[entity].service.ts`
- [ ] Create hook(s) in `src/apis/hooks/[entity].hooks.ts`
- [ ] Use `useQuery` for GET requests
- [ ] Use `useMutation` for POST/PUT/DELETE requests
- [ ] Define proper query keys (array format)
- [ ] Add TypeScript types for request/response
- [ ] Handle success/error callbacks in mutations (toast notifications)
- [ ] Export hooks from the hooks file
- [ ] Import and use hooks in components (never services directly)

---

## 8. Common Patterns

### With Pagination
```typescript
// Service
export const getEntitiesService = (params: { page?: number; limit?: number }) => {
  return axiosInstance.get("/entities", { params });
};

// Hook
export const useGetEntities = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["entities", page, limit],
    queryFn: async () => {
      const response = await getEntitiesService({ page, limit });
      return response.data.data;
    },
  });
};
```

### With Path Parameters
```typescript
// Service
export const getEntityByIdService = (id: string) => {
  return axiosInstance.get(`/entities/${id}`);
};

// Hook
export const useGetEntityById = (id?: string) => {
  return useQuery({
    queryKey: ["entity", id],
    queryFn: async () => {
      if (!id) throw new Error("ID required");
      const response = await getEntityByIdService(id);
      return response.data.data;
    },
    enabled: !!id,
  });
};
```

### Mutation with Invalidations (if using query invalidation)
```typescript
export const useDeleteEntity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteEntityService(id);
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["entities"] });
      toast.success("Deleted successfully");
    },
  });
};
```

---

## 9. What NOT to Do

- ❌ NEVER use raw `axios` in services (always use `axiosInstance`)
- ❌ NEVER call services directly from components (always use hooks)
- ❌ NEVER use `useEffect` + `useState` for data fetching (use TanStack Query)
- ❌ NEVER put business logic in services (keep them pure API calls)
- ❌ NEVER skip error handling in mutations
- ❌ NEVER use `any` type in API layer (use proper TypeScript types)

---

## 10. Summary

**Service Layer**: Pure API calls with axiosInstance → returns promises
**Hooks Layer**: TanStack Query hooks wrapping services → returns query/mutation objects
**Components**: Use hooks only → get typed data and loading/error states

Follow this pattern for every new API endpoint added to the project.
