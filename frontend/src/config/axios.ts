import { AxiosRequestConfig } from 'axios';
import { apiUrl } from './apiUrl';
import axios from 'axios';

const REQ_TIMEOUT = 10000;

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: apiUrl,
  timeout: REQ_TIMEOUT,
};

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      //TODO REDIRECT TO LOGIN
    }
    return error;
  }
);
