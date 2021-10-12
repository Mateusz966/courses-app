export type BaseSelectOption = {
    value: string;
    label: string;
  };
  
  // eslint-disable-next-line no-shadow
  export enum ApiErrorCode {
    ErrorDuringLogin,
    OtherError,
    InvalidCredentials,
    EmailIsTaken,
    InvalidParams,
    NotFoundById,
    WrongCourseId,
  }
  
  export type CustomSelectOption<T> = {
    value: T;
    label: string;
  };

  export enum Currency {
    PLN,
}