import { useState } from 'react';
import { UserMyProfile, UserReq } from '../app-types/user';
import { successNotification } from '../components/common/Toast';
import { history } from '../config/history';
import api from '../service/api';
import { useRootStore } from '../stores/storeContext';

interface UseProfile {
  submit: (payload: UserMyProfile, setError: any) => void;
  inProgress: boolean;
}

export const useProfile = (): UseProfile => {
  const { userStore } = useRootStore();
  const [inProgress, setInProgress] = useState(false);

  const submit = async (payload: UserMyProfile, setError?: any) => {
    setInProgress(true);

    const res = await api.post<UserReq, UserMyProfile>(
      `/user/profile`,
      payload,
      setError,
      setInProgress
    );

    if (res) {
      console.log(res);
      userStore.setUser(res);
      successNotification('Dane zostały zmienione');
      history.push('/profile');
    }
  };

  return {
    submit,
    inProgress,
  };
};
