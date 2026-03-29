import axiosInstance from "./axiosInstance";

export const authService = {
  getAccessToken: () => {
    return localStorage.getItem("access_token");
  },

  clearStorage: () => {
    return localStorage.clear();
  },

  setAccessToken: (token: string) => {
    return localStorage.setItem("access_token", token);
  },

  slientLogin: () => {
    return axiosInstance.get("/refresh-token");
  },

  isAuthenticated: () => {
    return !!authService.getAccessToken();
  },
};
