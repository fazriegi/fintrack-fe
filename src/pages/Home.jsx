import { message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "src/pkg/api/api";

export default function Home() {
  const navigate = useNavigate();

  const chekToken = async () => {
    try {
      await api.get("/api/v1/check-token");
    } catch (err) {
      const apiStatus = err?.response?.data?.status;
      const apiMessage = err?.response?.data?.message;

      if (apiStatus && apiMessage) {
        if (
          apiStatus.includes("Unauthorized") &&
          (apiMessage.includes("sign in to proceed") || apiMessage.includes("invalid or expired token"))
        ) {
          message.error("Unauthorized. Please login again.");
          navigate("/login");
          return;
        }

        message.error(apiMessage);
        return;
      }

      message.error(err?.message || "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    chekToken();
  }, []);

  return <>Home</>;
}
