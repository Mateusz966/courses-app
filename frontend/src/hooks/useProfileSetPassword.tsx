import { useState } from 'react';
import { UserSetPassword, UserReq } from '../app-types/user';
import { successNotification } from '../components/common/Toast';
import { history } from '../config/history';
import api from '../service/api';
import { useRootStore } from '../stores/storeContext';

interface UseProfileSetPassword {
  submit: (payload: UserSetPassword, setError: any) => void;
  inProgress: boolean;
}

export const useProfileSetPassword = (): UseProfileSetPassword => {
  const { userStore } = useRootStore();
  const [inProgress, setInProgress] = useState(false);

  const submit = async (payload: UserSetPassword, setError?: any) => {
    setInProgress(true);

    const res = await api.post<UserReq, UserSetPassword>(
      `/auth/profile/set-password`,
      payload,
      setError,
      setInProgress
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
