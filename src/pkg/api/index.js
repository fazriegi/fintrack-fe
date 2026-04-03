import axios from "axios";
import { BASE_URL } from "../constant";
import { handleLogout } from "../global/auth";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const apiStatus = error?.response?.data?.status || "";
    const apiMessage = error?.response?.data?.message || "";
    const isUnauthorized =
      error?.response?.status === 401 || apiStatus.includes("Unauthorized");

    if (originalRequest.url.includes("/v1/refresh_token")) {
      handleLogout();
      return Promise.reject(error);
    }

    // Logika Refresh: Hanya jika 401, ada pesan spesifik 'expired', dan belum pernah di-retry
    const isTokenExpired =
      apiMessage.includes("invalid or expired token") ||
      apiMessage.includes("sign in to proceed");

    if (isUnauthorized && isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/v1/refresh_token");

        // ulangi request asli yang tadi gagal
        return api(originalRequest);
      } catch (err) {
        handleLogout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
