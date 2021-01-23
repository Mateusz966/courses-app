import { ApiErrorCode } from "../app-types/global";



export const getError = (error: ApiErrorCode) => {
  switch (error) {
  case ApiErrorCode.ErrorDuringLogin:
    return 'Error during login';
  case ApiErrorCode.InvalidCredentials:
    return 'Invalid credentails';
  case ApiErrorCode.OtherError:
    return 'Wystąpił błąd';
  case ApiErrorCode.EmailIsTaken:
    return 'Given email is taken'
    default:
      return 'Wystąpił błąd';
  }
};