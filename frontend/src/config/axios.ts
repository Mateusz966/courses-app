import axios, { AxiosRequestConfig } from 'axios';
import { apiUrl } from './apiUrl';

import { history } from './history';

const REQ_TIMEOUT = 20000;

export const redirectToLogin = () => history.push('/sign-up');

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: apiUrl,
  withCredentials: true,
  timeout: REQ_TIMEOUT,
};

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

export const axios401Interceptor = () => {
  axios.interceptors.response.use(
    (res) => res,
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        redirectToLogin();
      }
      return error;
    },
  );
};
