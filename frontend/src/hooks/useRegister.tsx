import { useCallback, useState } from "react"
import { UserReq } from "../app-types/user";
import { successNotification } from "../components/common/Toast";
import { apiUrl } from "../config/apiUrl";
import { history } from "../config/history";
import api from "../service/api";

interface UseRegister {
  submit: (data: UserReq, setError: any) => void;
  inProgress: boolean;
}

export const useRegister = (): UseRegister => {

  const [inProgress, setInProgress] = useState(false);

  const submit = (data: UserReq, setError?: any) => {
    setInProgress(true)
    //Mapped react-select to backend req.
    if (data?.userCategories) {
      data.userCategories = data.userCategories.map((category: any) => ({ id: category.value }));
    }

    api
      .post<UserReq>(`${apiUrl}/auth/sign-up`, data, setInProgress, undefined, setError)
      .subscribe((res) => {
        setInProgress(false)
        successNotification('Correctly registered');
        history.push('/sign-in')
      });
  }
 
  return {
    submit,
    inProgress
  };
}