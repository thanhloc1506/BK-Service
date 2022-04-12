import axios from "axios";
import queryString from "query-string";
import cookies from "js-cookie";
import { StatusCodes } from "http-status-codes";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: "http://localhost:3007",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  const token = cookies.get("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == StatusCodes.UNAUTHORIZED) {
      // toast.error('Lỗi xác thực !', {
      //   position: "bottom-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      cookies.remove("token");
    }
    throw error;
  }
);

export default axiosClient;
