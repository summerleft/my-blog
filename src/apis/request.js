import axios from "axios";
import { getToken } from "@/utils/storage";

const Axios = axios.create({
  baseURL: "http://159.75.69.199:8080",
  timeout: 5000,
});

Axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = getToken();
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

Axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    Promise.reject(err);
  }
);

export default Axios;