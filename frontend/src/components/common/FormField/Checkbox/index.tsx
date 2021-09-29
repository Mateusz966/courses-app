import { FC } from 'react';
import { Checkbox as ChakraChekbox } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { BaseInputProps } from '../../../../interal-types';
import { useFormFieldContext } from '../../../../hooks/useFormFieldContext';

interface Props extends BaseInputProps {
  content: string;
  multiple?: boolean;
}

export const Checkbox: FC<Props> = ({
  content,
  multiple,
  onClick,
  onChange,
}) => {
  const { register } = useFormContext();
  const { isDisabled, id, name } = useFormFieldContext();
  const { onChange: fieldOnChange, ...rest } = register(name as string);
  return (
    <ChakraChekbox
      multiple={multiple}
      isDisabled={isDisabled}
      id={`${id || name}`}
      onChange={async (e) => {
        await fieldOnChange(e);
        onChange?.(e);
      }}
      {...rest}
    >
      {content}
    </ChakraChekbox>
  );
};
