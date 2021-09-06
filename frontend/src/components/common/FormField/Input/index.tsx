import { FC } from 'react';
import { Input as ChakraInput } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { BaseInputProps } from '../../../../interal-types';
import { useFormFieldContext } from '../../../../hooks/useFormFieldContext';

interface Props extends BaseInputProps {
  type: 'text' | 'number' | 'password' | 'email' | 'hidden';
}

export const Input: FC<Props> = ({
  type,
  placeholder,
  onChange,
  defaultValue,
}) => {
  const { register } = useFormContext();
  const { name, isDisabled, id } = useFormFieldContext();
  const { onChange: fieldOnChange, ...rest } = register(name);
  return (
    <ChakraInput
      borderRadius="25px"
      placeholder={placeholder}
      type={type}
      id={id || name}
      defaultValue={defaultValue}
      {...rest}
      isDisabled={isDisabled}
      onChange={async (e) => {
        await fieldOnChange(e);
        onChange?.();
      }}
    />
  );
};
