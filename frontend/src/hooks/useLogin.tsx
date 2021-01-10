import { useCallback } from "react"
import { apiUrl } from "../config/apiUrl";
import api from "../service/api";
import { UserLogin } from '../../../types/user'
import { history } from "../config/history";

interface UseLogin {
  submit: (data: UserLogin) => void
}

export const useLogin = (): UseLogin => {

  const submit = useCallback((data: UserLogin) => {
      api
        .post<UserLogin>(`${apiUrl}/auth/sign-in`, data)
        .subscribe((res) => {
          history.push('/dashboard')
        });
  }, [])


  return {
    submit
  };
}