import { SetError } from '../types/global';
import { UserDefault, UserReq } from '../app-types/user';
import { successNotification } from '../components/common/Toast';
import { history } from '../config/history';
import { useRootStore } from '../stores/storeContext';
import { useApi } from './useApi';

interface Props {
  setError: SetError;
}

interface UseProfileSetPassword {
  submit: (payload: UserReq) => void;
  inProgress: boolean;
}

export const useProfileSetPassword = (props: Props): UseProfileSetPassword => {
  const { userStore } = useRootStore();

  const { post, inProgress } = useApi({ setError: props.setError });

  const submit = async (payload: UserReq) => {
    const res = await post<UserReq, UserDefault>(
      '/auth/profile/set-password',
      payload,
    );

    if (res) {
      userStore.setUser(res);
      successNotification('Dane zostały zmienione');
      history.push('/dashboard/profile/set-password');
    }
  };

  return {
    submit,
    inProgress,
  };
};
