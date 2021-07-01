import { FC } from 'react';
import { Input as ChakraInput } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { BaseInputProps } from '../../../../app-types/form';
import { useFormFieldContext } from '../../../../hooks/useFormFieldContext';

interface Props extends BaseInputProps {
  type: 'text' | 'number' | 'password' | 'email' | 'hidden';
}

export const Input: FC<Props> = ({ type, placeholder }) => {
  const { register } = useFormContext();
  const { name, isDisabled, id } = useFormFieldContext();
  return (
    <ChakraInput
      borderRadius="25px"
      placeholder={placeholder}
      type={type}
      id={id || name}
      {...register(name as string)}
      isDisabled={isDisabled}
    />
  );
};
