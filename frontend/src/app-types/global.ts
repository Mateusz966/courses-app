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
// eslint-disable-next-line no-shadow
export enum Currency {
  PLN,
}

export interface ApiTableRes<T> {
  items: T;
  countTotal: number;
}
