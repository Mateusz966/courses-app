/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react';


interface Props {
  labelText?: string;
  helperText?: string;
}



export const FormField: FC<Props> = ({
  children,
  labelText,
  helperText
}) => {

  const { errors } = useFormContext();


  return (
    <FormControl isInvalid={errors.name} id="email">
      <FormLabel>{labelText && labelText}</FormLabel>
      {children}
      <FormHelperText>{helperText && helperText}</FormHelperText>
      <FormErrorMessage>
        {errors.name && errors.name.message}
      </FormErrorMessage>
    </FormControl>
  );
};

