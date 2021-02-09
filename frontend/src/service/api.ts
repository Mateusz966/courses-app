import initializeAxios from '../config/axiosSetup';
import { axiosRequestConfiguration } from '../config/axios';
import { handlingError } from '../helpers/handleErrors';

const axiosInstance = initializeAxios(axiosRequestConfiguration);

const get = <T>(
  url: string,
  queryParams?: object,
  setError?: any,
  setInProgress?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return axiosInstance
    .get<Promise<T>>(url, { params: queryParams })
    .then((res) => res.data)
    .catch((err) => {
      handlingError(err.response, setError);
    })
    .finally(() => {
      setInProgress?.(false);
    });
};

const post = <T, K>(
  url: string,
  body: K,
  setError?: any,
  setInProgress?: React.Dispatch<React.SetStateAction<boolean>>,
  queryParams?: any
) => {
  return axiosInstance
    .post<T>(url, body, { params: queryParams })
    .then((res) => res.data)
    .catch((err) => {
      handlingError(err.response, setError);
    })
    .finally(() => {
      setInProgress?.(false);
    });
};

const put = <T, K>(
  url: string,
  body: K,
  setError?: any,
  setInProgress?: React.Dispatch<React.SetStateAction<boolean>>,
  queryParams?: any
) => {
  return axiosInstance
    .put<T>(url, body, { params: queryParams })
    .then((res) => res.data)
    .catch((err) => {
      handlingError(err.response, setError);
    })
    .finally(() => {
      setInProgress?.(false);
    });
};

const patch = <T, K>(
  url: string,
  body: K,
  setError?: any,
  setInProgress?: React.Dispatch<React.SetStateAction<boolean>>,
  queryParams?: any
) => {
  return axiosInstance
    .patch<T>(url, body, { params: queryParams })
    .then((res) => res.data)
    .catch((err) => {
      handlingError(err.response, setError);
    })
    .finally(() => {
      setInProgress?.(false);
    });
};

const deleteR = (url: string, id: number) => {
  return axiosInstance.delete(`${url}/${id}`);
};

export default { get, post, put, patch, delete: deleteR };
