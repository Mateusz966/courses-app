import { FC } from "react";
import { BaseInputProps } from '../../../../app-types/form'
import { Input as ChakraInput } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form";


interface Props extends BaseInputProps {
  type: 'text' | 'number' | 'password' | 'email',
}

export const Input: FC<Props> = ({ onChange, onClick, name, type, id, isRequired, isDisabled }) => {
  const { register } = useFormContext();
  return (
    <ChakraInput 
      onChange={onChange}
      onClick={onClick}
      type={type}
      name={name}
      id={id || name}
      ref={register}
      disabled={isDisabled}
      required={isRequired}
    />
  )
}