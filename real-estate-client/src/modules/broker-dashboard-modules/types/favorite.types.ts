import type z from "zod";
import type { toggleFavoriteSchema } from "../validation-schema/favorite.schema";
import type { Property } from "./property.types";

export type toggleFavoritePayload = z.infer<typeof toggleFavoriteSchema>;

export interface ToggleFavoriteResponse {
  success: boolean;
  message: string;
  data: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: string;
    upsertedCount: number;
    matchedCount: number;
  };
}

export interface GetFavoritesByUserResponse {
  success: boolean;
  message: string;
  data: Property[];
}

export interface FavoriteData {
  _id: string;
  isFavorite: boolean;
  userId: string;
  createdAt: string;
  realEstateId: Property;
  updatedAt: string;
}

export interface GetFavoritesByUserResponseWithPagination {
  success: boolean;
  message: string;
  data: {
    favorites: FavoriteData[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface FavPaginationQuery {
  page?: number;
  limit?: number;
}
