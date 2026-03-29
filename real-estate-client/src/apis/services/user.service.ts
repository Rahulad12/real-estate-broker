import axiosInstance from "../axiosInstance";

export const getUserDetailsById = () => {
    return axiosInstance.get("/auth/user/me");
};
