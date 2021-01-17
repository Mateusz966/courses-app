import { useCallback } from "react"
import { UserReq } from "../../../types/user";
import { apiUrl } from "../config/apiUrl";
import api from "../service/api";

interface UseRegister {
  submit: (data: UserReq) => void
}

export const useRegister = (): UseRegister => {

  const submit = useCallback((data: UserReq) => {

    //Mapped react-select to backend req.
    data.userCategories = data.userCategories.map((category: any) => ( {id: category.value} ));

      api
        .post<UserReq>(`${apiUrl}/auth/sign-up`, data)
        .subscribe((res) => {
          console.log(res);
        });
  }, [])


  return {
    submit
  };
}