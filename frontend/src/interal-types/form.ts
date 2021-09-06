import { ReactNode, Ref, ChangeEventHandler } from 'react';

export type FormFieldContextType = {
  name: string;
  id?: string;
  isDisabled?: boolean;
};

export type FormFieldProviderType = {
  children: ReactNode;
  value: FormFieldContextType;
};

export type DatePickerContextType = {
  clearField: () => void;
  ref: Ref<any>;
};

export type DatePickerProviderType = {
  children: ReactNode;
  value: DatePickerContextType;
};

export interface BaseInputProps {
  defaultValue?: string;
  placeholder?: string;
  id?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  onChange?: <T>(e?: T) => ChangeEventHandler<HTMLInputElement> | undefined;
  onClick?: <T>(e: T) => void;
  name?: string;
}
