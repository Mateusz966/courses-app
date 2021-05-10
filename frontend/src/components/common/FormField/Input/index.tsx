import { FC } from 'react';
import { BaseInputProps } from '../../../../app-types/form';
import { Input as ChakraInput } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface Props extends BaseInputProps {
  type: 'text' | 'number' | 'password' | 'email' | 'hidden';
}

export const Input: FC<Props> = ({
  name,
  type,
  id,
  isRequired,
  isDisabled,
  placeholder
}) => {
  const { register } = useFormContext();
  return (
    <ChakraInput
      borderRadius="25px"
      placeholder={placeholder}
      type={type}
      id={id || name}
      {...register(name as string, { required: isRequired })}
      disabled={isDisabled}
    />
  );
};
