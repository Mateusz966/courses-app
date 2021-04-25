import { useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';
import { axiosRequestConfiguration } from '../config/axios';
import initializeAxios from '../config/axiosSetup';
import { handlingError } from '../helpers/handleErrors';
import { SetError } from '../app-types/global';


type ApiReqFnBasic = <T extends {}>(
  url: string,
  queryParams?: object | undefined
) => Promise<void | T>;
type ApiReqFn = <T, K>(
  url: string,
  body?: K | undefined,
  queryParams?: object | undefined
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

  const get = useCallback(<T extends {}>(url: string, queryParams?: object) => {
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
  }, [props?.setError]);

  const post = useCallback(<T, K>(url: string, body?: K, queryParams?: object) => {
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
  }, [props?.setError]);

  const put = useCallback(<T, K>(url: string, body?: K, queryParams?: object) => {
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
  }, [props?.setError]);

  const patch = <T, K>(url: string, body?: K, queryParams?: object) => {
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
  };

  const deleteR = (url: string, id: number) => {
    return axiosInstance.delete(`${url}/${id}`);
  };

  return {
    get,
    post,
    patch,
    put,
    deleteR,
    inProgress,
  };
};
