import { apiUrl } from "../config/apiUrl";
import api from "../service/api";
import { history } from "../config/history";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/user";
import { UserLogin, UserReq } from "../app-types/user";

interface UseLogin {
  submit: (data: UserLogin) => void
}

export const useLogin = (): UseLogin => {

  const dispatch = useDispatch();

  const submit = (data: UserLogin) => {
      api
        .post<UserLogin, UserReq>(`${apiUrl}/auth/sign-in`, data)
        .subscribe((res) => {
          if (res) {
            dispatch(setUser(res))

            history.push('/dashboard')
          }
        });
  }


  return {
    submit
  };
}