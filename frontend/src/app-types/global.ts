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
}

export type CustomSelectOption<T> = {
  value: T;
  label: string;
};
