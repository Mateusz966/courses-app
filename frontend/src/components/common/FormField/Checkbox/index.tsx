import { FC } from 'react';
import { BaseInputProps } from '../../../../../../types/form';
import { Checkbox as ChakraChekbox } from "@chakra-ui/react"
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
  onChange, 
  onClick,
  multiple,
  id
}) => {
  const {  register  } = useFormContext();

  return (
      <ChakraChekbox
        onChange={onChange}
        onClick={onClick}
        multiple={multiple}
        name={name}
        isDisabled={isDisabled}
        id={`${id || name}`}
        ref={register({required: isRequired && 'Field is required'})}
      >
        {content}
      </ChakraChekbox>
  );
}