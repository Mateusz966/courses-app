import { useState } from 'react';
import { UserReq } from '../app-types/user';
import { successNotification } from '../components/common/Toast';
import { apiUrl } from '../config/apiUrl';
import { history } from '../config/history';
import { UserSignUp } from '../interal-types/user';
import api from '../service/api';

interface UseRegister {
  submit: (data: UserSignUp, setError: any) => void;
  inProgress: boolean;
}

export const useRegister = (): UseRegister => {
  const [inProgress, setInProgress] = useState(false);

  const submit = (data: UserSignUp, setError?: any) => {
    setInProgress(true);
    const submitData: UserReq = {
      ...data,
      userCategories: data?.userCategories.map((category) => ({
        id: category.value,
      })),
    };
    api
      .post<UserReq>(
        `${apiUrl}/auth/sign-up`,
        submitData,
        setInProgress,
        undefined,
        setError
      )
      .subscribe((res) => {
        setInProgress(false);
        successNotification('Correctly registered');
        history.push('/sign-in');
      });
  };

  return {
    submit,
    inProgress,
  };
};
