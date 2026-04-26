import type { ENV } from "@/types/env.types";

export const env: ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
};
