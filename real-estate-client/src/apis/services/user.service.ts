import { UpdateEmailPayload, UpdatePasswordPayload } from "@/modules/profile-modules/types/profile.types";
import axiosInstance from "../axiosInstance";

export const getUserDetailsById = () => {
    return axiosInstance.get("/auth/user/me");
};

export const updateEmail = (data: UpdateEmailPayload) => {
    return axiosInstance.patch("/auth/update-email", data);
};

export const updatePassword = (data: UpdatePasswordPayload) => {
    return axiosInstance.patch("/auth/update-password", data);
};


