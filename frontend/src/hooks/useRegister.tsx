import { useState } from 'react';
import { UserReq } from '../app-types/user';
import { successNotification } from '../components/common/Toast';
import { apiUrl } from '../config/apiUrl';
import { history } from '../config/history';
import { SignUpUserPayload } from '../interal-types/user';
import api from '../service/api';

interface UseRegister {
  submit: (payload: SignUpUserPayload, setError: any) => void;
  inProgress: boolean;
}

export const useRegister = (): UseRegister => {
  const [inProgress, setInProgress] = useState(false);

  const submit = async (payload: SignUpUserPayload, setError?: any) => {
    setInProgress(true);

    const data: UserReq = {
      ...payload,
      userCategories: payload?.userCategories?.map((category) => ({
        id: category.value,
      })),
    };

    await api.post<UserReq, UserReq>(
      `${apiUrl}/auth/sign-up`,
      data,
      setError,
      setInProgress
    );

    successNotification('Correctly registered');
    history.push('/sign-in');
  };

  return {
    submit,
    inProgress,
  };
};
