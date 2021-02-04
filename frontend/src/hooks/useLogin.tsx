import api from '../service/api';
import { UserLogin, UserReq } from '../app-types/user';
import { useState } from 'react';
import { history } from '../config/history';
import { useRootStore } from '../stores/storeContext';
interface UseLogin {
  submit: (payload: UserLogin, setError: any) => void;
  inProgress: boolean;
}

export const useLogin = (): UseLogin => {
  const [inProgress, setInProgress] = useState(false);
  const { userStore } = useRootStore();

  const submit = async (payload: UserLogin, setError: any) => {
    const user = await api.post<UserReq, UserLogin>(
      `/auth/sign-in`,
      payload,
      setError,
      setInProgress
    );
    if (user) {
      userStore.setUser(user);
      history.push('/');
    }
  };

  return {
    submit,
    inProgress,
  };
};
