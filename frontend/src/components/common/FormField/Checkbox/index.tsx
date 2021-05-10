import { FC } from 'react';
import { BaseInputProps } from '../../../../app-types/form';
import { Checkbox as ChakraChekbox } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface Props extends BaseInputProps {
  content: string;
  multiple?: boolean;
}

export const Checkbox: FC<Props> = ({
  name,
  isDisabled,
  isRequired,
  content,
  multiple,
  id,
}) => {
  const { register } = useFormContext();

  return (
    <ChakraChekbox
      multiple={multiple}
      isDisabled={isDisabled}
      id={`${id || name}`}
      {...register(name as string, { required: isRequired })}
    >
      {content}
    </ChakraChekbox>
  );
};
