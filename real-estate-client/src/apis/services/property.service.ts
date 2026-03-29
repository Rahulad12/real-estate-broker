import axiosInstance from "../axiosInstance";

export const getPropertyService =() => {
return axiosInstance.get("/real-estate")
};