import axios from "axios";
import { BASE_URL } from "../constant";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const apiStatus = error?.response?.data?.status;
    const apiMessage = error?.response?.data?.message;
    if (
      apiStatus.includes("Unauthorized") &&
      (apiMessage.includes("sign in to proceed") ||
        apiMessage.includes("invalid or expired token"))
    )
      try {
        await api.post("/refresh");
        return api(error.config);
      } catch {
        window.location.href = "/login";
      }

    return Promise.reject(error);
  }
);

export default api;
