import { apiUrl } from '../config/apiUrl';
import api from '../service/api';
import { history } from '../config/history';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/user';
import { UserLogin, UserReq } from '../app-types/user';
import { useState } from 'react';

interface UseLogin {
  submit: (payload: UserLogin) => void;
  inProgress: boolean;
}

export const useLogin = (): UseLogin => {
  const dispatch = useDispatch();
  const [inProgress, setInProgress] = useState(false);

  const submit = (payload: UserLogin) => {
    api
      .post<UserLogin, UserReq>(`${apiUrl}/auth/sign-in`, payload, setInProgress)
      .subscribe((res) => {
        setInProgress(false);
        if (res) {
          dispatch(setUser(res));
          history.push('/dashboard');
        }
      });
  };

  return {
    submit,
    inProgress,
  };
};
