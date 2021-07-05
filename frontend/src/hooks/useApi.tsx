import { useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';
import { axiosRequestConfiguration } from '../config/axios';
import initializeAxios from '../config/axiosSetup';
import { handlingError } from '../helpers/handleErrors';
import { SetError } from '../types/global';

// eslint-disable-next-line @typescript-eslint/ban-types
type ApiReqFnBasic = <T extends {}>(
  url: string,
  queryParams?: Record<string, string>,
) => Promise<void | T>;
type ApiReqFn = <T, K>(
  url: string,
  body?: K | undefined,
  queryParams?: Record<string, string>,
) => Promise<void | T>;
type ApiReqDelete = (url: string, id: number) => Promise<AxiosResponse<any>>;

interface UseApi {
  inProgress: boolean;
  get: ApiReqFnBasic;
  post: ApiReqFn;
  put: ApiReqFn;
  patch: ApiReqFn;
  deleteR: ApiReqDelete;
}

interface Props {
  setError?: SetError;
}

const axiosInstance = initializeAxios(axiosRequestConfiguration);

export const useApi = (props?: Props): UseApi => {
  const [inProgress, setInProgress] = useState(false);

  const get = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-types
    <T extends {}>(url: string, queryParams?: object) => {
      setInProgress(true);
      return axiosInstance
        .get<Promise<T>>(url, { params: queryParams })
        .then((res) => res.data)
        .catch((err) => {
          handlingError(err.response, props?.setError);
        })
        .finally(() => {
          setInProgress(false);
        });
    },
    [props?.setError],
  );

  const post = useCallback(
    <T, K>(url: string, body?: K, queryParams?: Record<string, string>) => {
      setInProgress(true);
      return axiosInstance
        .post<T>(url, body, { params: queryParams })
        .then((res) => res.data)
        .catch((err) => {
          handlingError(err.response, props?.setError);
        })
        .finally(() => {
          setInProgress(false);
        });
    },
    [props?.setError],
  );

  const put = useCallback(
    <T, K>(url: string, body?: K, queryParams?: Record<string, string>) => {
      setInProgress(true);
      return axiosInstance
        .put<T>(url, body, { params: queryParams })
        .then((res) => res.data)
        .catch((err) => {
          handlingError(err.response, props?.setError);
        })
        .finally(() => {
          setInProgress(false);
        });
    },
    [props?.setError],
  );

  const patch = useCallback(
    <T, K>(url: string, body?: K, queryParams?: Record<string, string>) => {
      setInProgress(true);
      return axiosInstance
        .patch<T>(url, body, { params: queryParams })
        .then((res) => res.data)
        .catch((err) => {
          handlingError(err.response, props?.setError);
        })
        .finally(() => {
          setInProgress(false);
        });
    },
    [props?.setError],
  );

  const deleteR = (url: string, id: number) =>
    axiosInstance.delete(`${url}/${id}`);

  return {
    get,
    post,
    patch,
    put,
    deleteR,
    inProgress,
  };
};
