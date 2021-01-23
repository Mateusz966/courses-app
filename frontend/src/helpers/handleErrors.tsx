import { toast } from '../components/common/Toast';
import { getError } from './getError';


export const handlingError = (response: any, setError?: any) => {
  console.dir(response);
  if (!response) {
    return toast('Wystąpił błąd', 'error')
  };
  const { status, data } = response;
  const { message } = data;
  switch (status) {
    case 401:
      return null;
    case 400:
      typeof message === 'object'
        ? message.map(({ path, message }: any) => setError(path, { message, }))
        : toast(getError(data.errorCode), 'error');
      break;
    default:
      toast(getError(data.errorCode), 'error');
  }
};
