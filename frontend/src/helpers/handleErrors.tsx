import { AxiosResponse } from 'axios';
import { errorNotification } from '../components/common/Toast';
import { SetError } from '../types/global';
import { getError } from './getError';
import { history } from '../config/history';

export const handlingError = (response: AxiosResponse, setError?: SetError) => {
  if (!response) {
    return errorNotification('An error occured');
  }
  const { status, data } = response;
  const { message: resMessage } = data;
  switch (status) {
    case 401:
      history.push('/sign-in');
      return null;
    case 400:
      // eslint-disable-next-line no-unused-expressions
      typeof resMessage === 'object'
        ? resMessage.map(({ path, message }: any) =>
            setError?.(path, { message }),
          )
        : errorNotification(getError(data.errorCode));
      return null;
    default:
      errorNotification(getError(data.errorCode));
      return null;
  }
};
