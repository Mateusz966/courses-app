import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';
import { BaseInputProps } from '../../../../app-types/form';
import {
  BaseSelectOption,
  CustomSelectOption,
} from '../../../../app-types/global';

const customStyles = {
  control: (provided: any) => {
    const borderRadius = '25px';
    return { ...provided, borderRadius };
  },
};

interface Props extends BaseInputProps {
  options?: BaseSelectOption[] | CustomSelectOption<any>[];
  handleChange?: (
    selected?:
      | BaseSelectOption
      | BaseSelectOption[]
      | CustomSelectOption<any>
      | CustomSelectOption<any>[]
      | null
  ) => void;
  isMulti?: boolean;
  name?: any;
  defaultValue?: any;
}

export const FormSelect: FC<Props> = ({
  handleChange,
  options,
  isRequired,
  isDisabled,
  name,
  isMulti,
  defaultValue,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      placeholder="Wybierz"
      defaultValue={defaultValue}
      render={({ value, name, onChange }) => (
        <Select
          defaultValue={defaultValue}
          styles={customStyles}
          isMulti={isMulti}
          options={options}
          isDisabled={isDisabled}
          onChange={(e: any) => {
            onChange(e);
            handleChange?.(e);
          }}
          name={name}
          placeholder="Wybierz"
          value={value}
        />
      )}
    />
  );
};
