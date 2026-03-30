import type {
  FavPaginationQuery,
  toggleFavoritePayload,
} from "@/modules/broker-dashboard-modules/types/favorite.types";
import axiosInstance from "../axiosInstance";

export const toggleSaveAsFavorite = (
  favoritePayload: toggleFavoritePayload,
) => {
  return axiosInstance.post(
    `/favorites?realEstateId=${favoritePayload.realEstateId}&isFavorite=${favoritePayload.isFavorite}`,
  );
};

export const getFavoritesByUser = (pagination?: FavPaginationQuery) => {
  return axiosInstance.get(`/favorites/by-user`, { params: pagination });
};

export const getFavoritesCount = () => {
  return axiosInstance.get(`/favorites/count`);
};