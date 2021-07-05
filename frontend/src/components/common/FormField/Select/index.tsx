import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';
import { BaseInputProps } from '../../../../interal-types';
import {
  BaseSelectOption,
  CustomSelectOption,
} from '../../../../app-types/global';
import { useFormFieldContext } from '../../../../hooks/useFormFieldContext';

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
      | null,
  ) => void;
  isMulti?: boolean;
  // name?: any;
  defaultValue?: any;
}

export const FormSelect: FC<Props> = ({
  handleChange,
  options,
  isRequired,
  isMulti,
  defaultValue,
}) => {
  const { control } = useFormContext();
  const { name } = useFormFieldContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ required: isRequired }}
      render={({ field, fieldState }) => (
        <Select
          defaultValue={defaultValue}
          styles={customStyles}
          isMulti={isMulti}
          options={options}
          onChange={(e: any) => {
            field.onChange(e);
            handleChange?.(e);
          }}
          name={name}
          placeholder="Wybierz"
          value={field.value}
        />
      )}
    />
  );
};
