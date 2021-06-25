import { FC } from 'react';
import { BaseInputProps } from '../../../../app-types/form';
import { Textarea as ChakraTextarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export const Textarea: FC<BaseInputProps> = ({
  name,
  id,
  isRequired,
  isDisabled,
  placeholder
}) => {
  const { register } = useFormContext();
  return (
    <ChakraTextarea
      borderRadius="25px"
      placeholder={placeholder}
      id={id || name}
      {...register(name as string, { required: isRequired })}
      disabled={isDisabled}
    />
  );
};
