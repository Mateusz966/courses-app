import { FC } from 'react';
import { Checkbox as ChakraChekbox } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { BaseInputProps } from '../../../../interal-types';
import { useFormFieldContext } from '../../../../hooks/useFormFieldContext';

interface Props extends BaseInputProps {
  content: string;
  multiple?: boolean;
}

export const Checkbox: FC<Props> = ({ content, multiple }) => {
  const { register } = useFormContext();
  const { isDisabled, id, name } = useFormFieldContext();
  return (
    <ChakraChekbox
      multiple={multiple}
      isDisabled={isDisabled}
      id={`${id || name}`}
      {...register(name as string)}
    >
      {content}
    </ChakraChekbox>
  );
};
