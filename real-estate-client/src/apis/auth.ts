import axiosInstance from "./axiosInstance";

export const authService = {
  getAccessToken: () => {
    return localStorage.getItem("access_token");
  },

  getRefreshToken: () => {
    return localStorage.getItem("refresh_token");
  },

  clearStorage: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  setAccessToken: (token: string) => {
    return localStorage.setItem("access_token", token);
  },

  setRefreshToken: (token: string) => {
    return localStorage.setItem("refresh_token", token);
  },

  silentLogin: () => {
    return axiosInstance.post("/users/refresh-token", {
      refreshToken: authService.getRefreshToken(),
    });
  },

  isAuthenticated: () => {
    return !!authService.getAccessToken();
  },
};
