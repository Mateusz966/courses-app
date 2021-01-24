import { useCallback } from "react"
import { UserReq } from "../app-types/user";
import { successNotification } from "../components/common/Toast";
import { apiUrl } from "../config/apiUrl";
import { history } from "../config/history";
import api from "../service/api";

interface UseRegister {
  submit: (data: UserReq, setError: any) => void
}

export const useRegister = (): UseRegister => {

  const submit = (data: UserReq, setError?: any) => {
    //Mapped react-select to backend req.
    if (data?.userCategories) {
      data.userCategories = data.userCategories.map((category: any) => ({ id: category.value }));
    }

    api
      .post<UserReq>(`${apiUrl}/auth/sign-up`, data, undefined, setError)
      .subscribe((res) => {
        successNotification('Correctly registered');
        history.push('/sign-in')
      });
  }
 
  return {
    submit
  };
}