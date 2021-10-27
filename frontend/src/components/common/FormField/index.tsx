import { FC, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';

import { FormFieldProvider } from '../../../hooks/useFormFieldContext';
import { FormFieldContextType } from '../../../interal-types';

interface Props extends FormFieldContextType {
  name: string;
  children: ReactNode;
  labelText?: string;
  helperText?: string;
  mb4?: boolean;
}

export const FormField: FC<Props> = ({
  children,
  labelText,
  helperText,
  id,
  mb4,
  name,
  isDisabled,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FormFieldProvider value={{ name, id, isDisabled }}>
      <FormControl mb={mb4 ? 4 : 0} isInvalid={errors[name]}>
        <FormLabel htmlFor="firstName">{labelText && labelText}</FormLabel>
        {children}
        <FormHelperText>{helperText && helperText}</FormHelperText>
        <FormErrorMessage>
          {errors?.[name] && errors[name]?.message}
        </FormErrorMessage>
      </FormControl>
    </FormFieldProvider>
  );
};
