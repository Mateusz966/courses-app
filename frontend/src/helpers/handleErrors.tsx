import { AxiosResponse } from 'axios';
import { errorNotification } from '../components/common/Toast';
import { SetError } from '../types/global';
import { getError } from './getError';

export const handlingError = (response: AxiosResponse, setError?: SetError) => {
  console.dir(response);
  if (!response) {
    return errorNotification('An error occured');
  }
  const { status, data } = response;
  const { message } = data;
  switch (status) {
    case 401:
      return null;
    case 400:
      typeof message === 'object'
        ? message.map(({ path, message }: any) => setError?.(path, { message }))
        : errorNotification(getError(data.errorCode));
      break;
    default:
      errorNotification(getError(data.errorCode));
  }
};
