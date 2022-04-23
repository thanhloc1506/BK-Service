import axios from "axios";
import queryString from "query-string";
import cookies from "js-cookie";
import {StatusCodes} from "http-status-codes";
import {toast} from "react-toastify";

export const apiUrl = process.env.API_URL || "localhost:8080";
const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  const token = cookies.get("eToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == StatusCodes.UNAUTHORIZED) {
      toast.error('Lỗi xác thực !', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      cookies.remove("eToken");
    }
    throw error;
  }
);

export default axiosClient;
