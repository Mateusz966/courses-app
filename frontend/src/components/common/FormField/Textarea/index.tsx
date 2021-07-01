import { FC } from 'react';
import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { BaseInputProps } from '../../../../app-types/form';
import { useFormFieldContext } from '../../../../hooks/useFormFieldContext';

export const Textarea: FC<BaseInputProps> = ({ placeholder }) => {
  const { register } = useFormContext();
  const { name, isDisabled, id } = useFormFieldContext();
  return (
    <ChakraTextarea
      borderRadius="25px"
      placeholder={placeholder}
      id={id || name}
      {...register(name as string)}
      isDisabled={isDisabled}
    />
  );
};
