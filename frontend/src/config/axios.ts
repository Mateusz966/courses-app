import { AxiosRequestConfig, Method } from "axios";
import { apiUrl } from "./apiUrl";

export const axiosConfig = <T>(
    path: string, 
    method: Method, 
    data?: T, 
    params?: string, 
    timeout?: number
 ): AxiosRequestConfig => ({
    withCredentials: true,
    timeout: timeout ? timeout : 6000,
    url: apiUrl + path,
    method,
    data,
    params,
  });
  