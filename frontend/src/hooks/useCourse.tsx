import { UserLogin } from '../app-types/user';
import { useState } from 'react';

interface UseLogin {
  submit: (payload: UserLogin) => void;
  inProgress: boolean;
}

export const useLogin = (): UseLogin => {

  const [inProgress, setInProgress] = useState(false);

  const submit = async (payload: UserLogin) => {

  };

  return {
    submit,
    inProgress,
  };
};
