import React, { FC } from 'react';
import {
  FormFieldContextType,
  FormFieldProviderType,
} from '../interal-types/form';

const FormFieldContext = React.createContext<FormFieldContextType | undefined>(
  undefined,
);

const FormFieldProvider: FC<FormFieldProviderType> = ({ children, value }) => (
  <FormFieldContext.Provider value={value}>
    {children}
  </FormFieldContext.Provider>
);

const useFormFieldContext = (): FormFieldContextType => {
  const context = React.useContext(FormFieldContext);
  if (context === undefined) {
    throw new Error(
      'useFormFieldContext must be used within a FormFieldProvider',
    );
  }
  return context;
};

export { FormFieldProvider, useFormFieldContext };
