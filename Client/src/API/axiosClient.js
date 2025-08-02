import axios from "axios";
import { notify } from "../Context/Notification/notificationService";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => {
     if (response.status >= 400) {
      notify(`Error: ${response.status} - ${response.data?.message || "Unknown error"}`, "error");
    }
    return response;
  },
  (error) => {
    if (error.code === "ERR_NETWORK") {
      if (!window.navigator.onLine) {
        notify("Device offline.", "error");
      } else {
        notify(
          "Cannot reach the server. Please try again later.",
          "error"
        );
      }
    }
    else {
      notify(`${error?.status} - ${error.response?.data?.message || error.message}`, "error");
    }
    console.error("API error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
