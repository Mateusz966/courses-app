import { AxiosRequestConfig } from "axios";
import { apiUrl } from "./apiUrl";
import axios from "axios";
import { store } from "./store";
import { clearUser, redirectToLogin } from "../slices/user";

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: apiUrl,
};

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(clearUser());
      redirectToLogin();
    }
  }
);
