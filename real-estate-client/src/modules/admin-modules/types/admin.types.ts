/**
 * @fileoverview Admin Types
 * @description TypeScript types for Admin module
 */

/**
 * Admin statistics interface
 * @interface AdminStats
 */
export interface AdminStats {
  /** Total number of registered users */
  totalUsers: number;
  /** Total number of properties listed */
  totalProperties: number;
  /** Total views across all properties */
  totalViews: number;
  /** Total likes across all properties */
  totalLikes: number;
  /** Array of trending property IDs */
  trendingProperties: string[];
}

/**
 * User with pagination response
 * @interface UserWithPagination
 */
export interface UserWithPagination {
  /** Array of user objects */
  users: Array<{
    _id: string;
    userName: string;
    email: string;
    role: string;
    createdAt: string;
  }>;
  /** Pagination metadata */
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
