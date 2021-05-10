import { FC, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import React from 'react';
import { BaseInputProps } from '../../../app-types/form';

interface Props {
  labelText?: string;
  helperText?: string;
  inputName: string;
  children: ReactNode;
}

export const FormField: FC<Props> = ({
  labelText,
  helperText,
  inputName,
  children,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={errors[inputName]}>
      <FormLabel htmlFor="firstName">{labelText && labelText}</FormLabel>
      {React.isValidElement(children) &&
        React.cloneElement<BaseInputProps>(children, { name: inputName })}
      <FormHelperText>{helperText && helperText}</FormHelperText>
      <FormErrorMessage>
        {errors?.[inputName] && errors[inputName]?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
