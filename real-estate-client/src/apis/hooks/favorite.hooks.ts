import { useMutation, useQuery } from "@tanstack/react-query";
import { getFavoritesByUser, getFavoritesCount, toggleSaveAsFavorite } from "../services/favorite.service";
import type {
  FavPaginationQuery,
  GetFavoritesByUserResponseWithPagination,
  toggleFavoritePayload,
  ToggleFavoriteResponse,
} from "@/modules/broker-dashboard-modules/types/favorite.types";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useToggleSaveAsFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (favoritePayload: toggleFavoritePayload) => {
      const response: AxiosResponse<ToggleFavoriteResponse> =
        await toggleSaveAsFavorite(favoritePayload);
      return response.data;
    },
    onSuccess(data) {
      toast.success(data.message);
      console.log("Favorite toggled successfully", data);
      queryClient.invalidateQueries({ queryKey: ["favorites-by-user"] });
      queryClient.invalidateQueries({ queryKey: ["favorites-count"] });
    },
  });
};

export const useGetFavoritesByUser = (pagination?: FavPaginationQuery) => {
  return useQuery({
    queryKey: ["favorites-by-user", pagination],
    queryFn: async () => {
      const response: AxiosResponse<GetFavoritesByUserResponseWithPagination> =
        await getFavoritesByUser(pagination);
      return response.data;
    },
  });
};

export const useGetFavoritesCount = () => {
  return useQuery({
    queryKey: ["favorites-count"],
    queryFn: async () => {
      const response: AxiosResponse<{
        success: boolean;
        data: number;
      }> = await getFavoritesCount();
      return response.data.data;
    },
  });
};
