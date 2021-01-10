import { useCallback } from "react"
import { apiUrl } from "../config/apiUrl";
import api from "../service/api";
import { UserLogin, UserReq } from '../../../types/user'
import { history } from "../config/history";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/user";

interface UseLogin {
  submit: (data: UserLogin) => void
}

export const useLogin = (): UseLogin => {

  const dispatch = useDispatch();

  const submit = useCallback((data: UserLogin) => {
      api
        .post<UserLogin, UserReq>(`${apiUrl}/auth/sign-in`, data)
        .subscribe((res) => {
          if (res) {
            dispatch(setUser(res))
            history.push('/dashboard')
          }
        });
  }, [])


  return {
    submit
  };
}