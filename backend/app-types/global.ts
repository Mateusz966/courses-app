export type BaseSelectOption = {
    value: string;
    label: string;
}


export enum ApiErrorCode {
    ErrorDuringLogin,
    OtherError,
    InvalidCredentials
}