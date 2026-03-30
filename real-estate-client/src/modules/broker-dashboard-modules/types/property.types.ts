export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: "apartment" | "house" | "villa" | "commercial" | string;
  status: "available" | "sold" | "rented" | string;
  type: "buy" | "rent" | string;
  location: { address: string; lat: string; lng: string };
  createdAt: string;
}

export interface PropertyResponse {
  success: boolean;
  data: Property[];
  message: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PropertyWithPaginationResponse {
  success: boolean;
  data: {
    realEstates: Property[];
    pagination: PaginationInfo;
  };
  message: string;
}

export interface PropertyQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
}