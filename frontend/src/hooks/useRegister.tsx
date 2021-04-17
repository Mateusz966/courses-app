import { SetError } from '../app-types/global';
import { UserReq } from '../app-types/user';
import { successNotification } from '../components/common/Toast';
import { apiUrl } from '../config/apiUrl';
import { history } from '../config/history';
import { SignUpUserPayload } from '../interal-types/user';
import { useApi } from './useApi';

interface Props {
  setError: SetError
}
interface UseRegister {
  submit: (payload: SignUpUserPayload, setError: any) => void;
  inProgress: boolean;
}

export const useRegister = (props: Props): UseRegister => {

  const { inProgress, post } = useApi({setError: props.setError})

  const submit = async (payload: SignUpUserPayload) => {


    const data: UserReq = {
      ...payload,
      userCategories: payload?.userCategories?.map(({ value }) => ({
        id: value.id,
      })),
    };

    const res = await post<UserReq, UserReq>(
      `${apiUrl}/auth/sign-up`,
      data,
    );

    if (res) {
      successNotification('Correctly registered');
      history.push('/sign-in');
    }
  };

  return {
    submit,
    inProgress,
  };
};
