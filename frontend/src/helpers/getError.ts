import { ApiErrorCode } from '../app-types/global';

export const getError = (error: ApiErrorCode) => {
  switch (error) {
    case ApiErrorCode.ErrorDuringLogin:
      return 'Error during login';
    case ApiErrorCode.InvalidCredentials:
      return 'Invalid credentails';
    case ApiErrorCode.OtherError:
      return 'An error occured';
    case ApiErrorCode.EmailIsTaken:
      return 'Given email is taken';
    case ApiErrorCode.NotFoundById:
      return 'Nie znaleziono';
    case ApiErrorCode.WrongCourseId:
      return 'Wrong course id';
    default:
      return 'An error occured';
  }
};
