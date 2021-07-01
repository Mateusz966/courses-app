import { ReactNode, Ref } from 'react';

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
