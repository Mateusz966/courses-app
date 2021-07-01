import { useState } from 'react';
import { UserReq } from '../app-types/user';
import { successNotification } from '../components/common/Toast';
import { history } from '../config/history';
import api from '../service/api';
import { useRootStore } from '../stores/storeContext';

interface UseProfile {
  submit: (payload: any, setError: any) => void;
  inProgress: boolean;
}

export const useProfile = (): UseProfile => {
  const { userStore } = useRootStore();
  const [inProgress, setInProgress] = useState(false);
  const { fileStore } = useRootStore();

  const submit = async (payload: any, setError?: any) => {
    setInProgress(true);
    const fd = new FormData();
    fd.append('body', JSON.stringify(payload));

    if (fileStore?.files) {
      fileStore.files.forEach(({ file, name }) => {
        fd.append(name, file, name);
      });
    }

    const res = await api.post<UserReq, any>(
      '/user/profile/details',
      fd,
      setError,
      setInProgress,
    );

    if (res) {
      userStore.setUser(res);
      successNotification('Dane zostały zmienione');
      history.push('/dashboard/profile/details');
    }
  };

  return {
    submit,
    inProgress,
  };
};
