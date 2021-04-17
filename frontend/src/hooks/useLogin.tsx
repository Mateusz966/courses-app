import { UserLogin, UserReq } from '../app-types/user';
import { history } from '../config/history';
import { useRootStore } from '../stores/storeContext';
import { useApi } from './useApi';
import { SetError } from '../../../app-types/global';

interface Props {
  setError: SetError;
}

interface UseLogin {
  submit: (payload: UserLogin) => void;
  inProgress: boolean;
}

export const useLogin = (props: Props): UseLogin => {
  const { userStore } = useRootStore();
  const { inProgress, post } = useApi({ setError: props?.setError });

  const submit = async (payload: UserLogin) => {
    const user = await post<UserReq, UserLogin>('/auth/sign-in', payload);

    if (user) {
      userStore.setUser(user);
      history.push('/dashboard');
    }
  };

  return {
    submit,
    inProgress,
  };
};
