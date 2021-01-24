/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import { FC, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import React from 'react';

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
  const { errors } = useFormContext();

  return (
    <FormControl isInvalid={errors[inputName]}>
      <FormLabel htmlFor="firstName">{labelText && labelText}</FormLabel>
      {React.isValidElement(children) &&
        React.cloneElement(children, { name: inputName })}
      <FormHelperText>{helperText && helperText}</FormHelperText>
      <FormErrorMessage>
        {errors?.[inputName] && errors[inputName]?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
