import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';
import { BaseSelectOption } from '../../../../../../types/global';
import { BaseInputProps } from '../../../../../../types/form';


interface Props extends BaseInputProps {
  options?: BaseSelectOption[],
  handleChange?: (selected?: BaseSelectOption | BaseSelectOption[] | null) => void
  isMulti?: boolean;
}

export const FormSelect: FC<Props> = ({
  handleChange,
  options,
  isRequired,
  isDisabled,
  name,
  isMulti
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      placeholder="Wybierz"
      defaultValue={null}
      required={isRequired}
      render={({ value, name, onChange }) => (
        <Select
          isMulti={isMulti}
          options={options}
          isDisabled={isDisabled}
          onChange={(e: any) => {
            onChange(e)
            handleChange && handleChange(e)
          }}
          name={name}
          placeholder="Wybierz"
          value={value}
        />
      )}
    />
  )
}