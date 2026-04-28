/**
 * @fileoverview Admin Types
 * @description TypeScript types for Admin module
 */

export interface StatItem {
  _id: string;
  count: number;
}

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
  /** User role distribution stats */
  userStats: StatItem[];
  /** Property status distribution stats */
  propertyStats: StatItem[];
  /** Scheduling status distribution stats */
  schedulingStats: StatItem[];
}

export interface User {
  _id: string;
  userName: string;
  email: string;
  role: 'user' | 'broker' | 'admin';
  createdAt: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

/**
 * User with pagination response
 * @interface UserWithPagination
 */
export interface UserWithPagination {
  /** Array of user objects */
  users: User[];
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

export interface Scheduling {
  _id: string;
  property: {
    _id: string;
    title: string;
    price: number;
    location: {
      address: string;
      city: string;
      country: string;
      lng: string;
      lat: string;
    };
  };
  user: {
    _id: string;
    userName: string;
    email: string;
    phone: string;
  };
  agent?: {
    _id: string;
    userName: string;
    email: string;
  };
  requestedDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  adminNotes?: string;
  createdAt: string;
}

export interface SchedulingWithPagination {
  schedulings: Scheduling[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
