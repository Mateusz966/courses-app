import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';
import { BaseInputProps } from '../../../../app-types/form';
import { BaseSelectOption } from '../../../../app-types/global';

const customStyles = {
  control: (provided: any) => {
    const borderRadius = '25px'
    return {...provided, borderRadius}
  },
}


interface Props extends BaseInputProps {
  options?: BaseSelectOption[];
  handleChange?: (
    selected?: BaseSelectOption | BaseSelectOption[] | null
  ) => void;
  isMulti?: boolean;
  name?: any;
}

export const FormSelect: FC<Props> = ({
  handleChange,
  options,
  isRequired,
  isDisabled,
  name,
  isMulti,
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
          styles={customStyles}
          isMulti={isMulti}
          options={options}
          isDisabled={isDisabled}
          onChange={(e: any) => {
            onChange(e);
            handleChange && handleChange(e);
          }}
          name={name}
          placeholder="Wybierz"
          value={value}
        />
      )}
    />
  );
};
