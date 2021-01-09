import axios, { Method } from 'axios';
import { useState } from 'react';
import { useForm, UseFormMethods } from 'react-hook-form';
// import { MsgResult } from '../types/msgResults';
// import { handlingError } from '../helpers/handlingErrors';
import { axiosConfig } from '../config/axios';

interface Props {
  timeout?: number;
  methods?: UseFormMethods<Record<string, any>>;
}

export const useApi = (props?: Props) => {
  const [loading, setLoading] = useState(false);

  const api = async <T>({
    method,
    path,
    data,
    onSuccess,
    onError,
    withoutLoading,
    withDelay,
    params,
  }: ApiProps<T>) => {
    if (!withoutLoading) {
      setLoading(true);
    }
    const startAt = new Date();
    axios(axiosConfig(path, method, data, params, props?.timeout))
      .then((res) =>
        setTimeout(() => {
          onSuccess?.(res?.data);
          setLoading(false);
        }, getSetTimeoutTime(startAt, withDelay))
      )
      .catch((err) =>
        setTimeout(() => {
          console.log(err?.response);
          setLoading(false);
          // onError ? onError(err) : handlingError(err?.response,  props?.methods?.setError);
        }, getSetTimeoutTime(startAt, withDelay))
      );
  };

  return { api, loading };
};

const delay = 500;
const getSetTimeoutTime = (startAt: Date, withDelay?: boolean) => {
  const latency = startAt.getTime() - new Date().getTime();
  const isLatencyMoreThenDelay = latency < delay;
  return withDelay && isLatencyMoreThenDelay ? delay - latency : 0;
};
interface ApiProps<T> {
  method: Method;
  path: string;
  data?: any;
  onSuccess?: <T>(res: T) => void;
  onError?: (res: any) => void;
  withoutLoading?: boolean;
  withDelay?: boolean;
  params?: string;
}
