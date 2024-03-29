/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react';


interface Props {
  labelText?: string;
  helperText?: string;
  inputName: string;
}



export const FormField: FC<Props> = ({
  children,
  labelText,
  helperText,
  inputName
}) => {

  const { errors } = useFormContext();


  return (
    <FormControl isInvalid={errors[inputName]}>
      <FormLabel htmlFor="firstName">{labelText && labelText}</FormLabel>
        {children}
      <FormHelperText>{helperText && helperText}</FormHelperText>
      <FormErrorMessage>
        {errors?.[inputName] && errors[inputName]?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

