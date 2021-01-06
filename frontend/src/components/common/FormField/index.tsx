/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import React, { FC, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { PhotoWrapper } from '..';
import { apiUrl } from '../../../config/apiUrl';
import { Photo } from '../../../types/photo';
import { Image } from '../../Common';
import { translatedErrors } from '../../../helpers/translatedApiErrors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type FormFieldTypes =
  | 'text'
  | 'number'
  | 'file'
  | 'password'
  | 'color'
  | 'select'
  | 'email'
  | 'checkbox'
  | 'textarea'
  | 'date'
  | 'hidden';

export type SelectOptions = {
  _id: string;
  text: string;
};

interface StyledSelectProps {
  multiple?: boolean;
}

interface StyledFileInputProps {
  isFile?: boolean;
  disabled?: boolean;
}

interface StyledFormFieldErrorProps {
  big?: boolean;
}

const InputContainer = styled.div`
  display: flex;
`;

const InputIcon = styled.button`
  margin-left: -3.5rem;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  opacity: 0.4;
  transition: 0.3s;
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  &:hover {
    opacity: 0.5;
  }
`;

export const StyledFormFieldError = styled.span<StyledFormFieldErrorProps>`
  font-size: ${(props) => props.big ? '1.6rem' : '1rem  '};
  display: block;
  color: ${({ theme }) => theme.colors.colorDanger};
  margin: ${({ theme }) => `calc(${theme.mainSpacing}) 0`};
`;

const StyledFileInput = styled.input<StyledFileInputProps>`
  opacity: ${(props) => (!props.isFile ? '0' : '1')};
  ${(props) =>
    !props.isFile &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      top: 20px;
      background-color: #fff;
    `}
`;

const StyledSelect = styled.select<StyledSelectProps>`
  -webkit-appearance: none;
  -moz-appearance: none;
  background: none;
  background-position: ${({ theme }) => `right calc(${theme.mainSpacing} * 1.5) center`};
  background-repeat: no-repeat;
  background-size: 10px;
  background-color: ${({ theme }) => theme.colors.colorInput};
  background-image: url('/assets/images/arrow-down.svg');
  border: transparent;
  border-radius: ${({ theme }) => `${theme.borderRadius}px`};
  outline: none;
  height: 49px;
  padding: ${({ theme }) => `calc(2 * ${theme.mainSpacing}) ${theme.mainSpacing}`};
  color: ${({ theme }) => theme.colors.colorDark};
  display: block;
  width: 100%;
  line-height: 1.5rem;
  transition: $transition-time background-color;
  padding-top: 0;
  padding-bottom: 0;

  ${({ multiple }) =>
    multiple &&
    css`
      background-color: ${({ theme }) => theme.colors.colorInput};
      width: 100%;
      height: auto;
      padding: ${({ theme }) => `calc(${theme.mainSpacing} * .5)`};
      margin: 0;
      border: none;
      -moz-appearance: menulist;
      -webkit-appearance: menulist;
      appearance: menulist;
    `}
`;

interface FormFieldInputProps {
  type: FormFieldTypes;
  name: string;
  editId?: string | number;
  photoEp?: string;
  accept?: string;
  placeholderText?: string;
  isRequired?: boolean;
  id?: string;
  value?: string;
  description?: string;
  multiple?: boolean;
  isFile?: boolean;
  options?: any[];
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  stringSelect?: boolean;
  filePath?: string;
  customFilePath?: string;
  findByName?: (fieldName: string) => Photo[];
  defaultValue?: any;
  fieldArrayName?: string;
  readonly?: boolean;
  labelText?: string | React.ReactNode;
  iconClick?: () => void;
}

interface DraggableInput {
  draggableInput?: boolean;
}

interface StyledWrapperProps extends DraggableInput {

}

interface StyledFormFieldProps extends DraggableInput {
  checkbox?: boolean;
  textarea?: boolean;
  customColor?: boolean;
  icon?: IconProp;
  mb0?: boolean;
  onDragOver?: any;
  onDragEnter?: any;
  onDragLeave?: any;
  onDragEnd?: any;
  onDrop?: any;
  
}

interface Props extends FormFieldInputProps, StyledFormFieldProps {
  labelText?: string | React.ReactNode;
  labelClassname?: string;
  field?: 'input' | React.ReactNode;
  isRequired?: boolean;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
    ${({draggableInput}) => draggableInput && (
    css`
      position: relative;
    `
  )}
`;

const StyledCheckbox = styled.div`
  display: flex;
`;

const StyledCheckboxInput = styled.input`
  margin-right: ${({ theme }) => theme.mainSpacing};
  margin-top: 0;
  margin-left: 0;
`;

const StyledInputLabel = styled.label`
  margin-bottom: calc(${({ theme }) => theme.mainSpacing} / 2);
  display: block;
`;

const StyledFormField = styled.div<StyledFormFieldProps>`
  margin-bottom: ${(props) => props.mb0 ? '0;' : '15px;'};
  position: relative;
  ${({draggableInput, theme}) => draggableInput && (
    css`
      border: dashed 4px ${theme.colors.colorPrimary};
      display: flex;
      align-items: center;
      min-height: 60px;
      padding: calc(${theme.mainSpacing} * 2);
      input {
        opacity: 0;
        position: absolute;
      }
    `
  )}
  ${({ theme, checkbox, textarea, customColor, icon }) => {
    const { mainSpacing, borderRadius, transitionTime, fontPrimary } = theme;
    const { colorDark, colorInput, colorGray, colorPrimary, colorDanger } = theme.colors;
    return theme.mixins.formInput({
      colorDark,
      colorInput,
      colorGray,
      colorPrimary,
      colorDanger,
      mainSpacing,
      fontPrimary,
      borderRadius,
      transitionTime,
      checkbox,
      textarea,
      customColor,
      icon: !!icon,
    });
  }};
`;

const renderCorrectInput = (
  register: any,
  {
    type,
    isRequired,
    accept,
    name,
    id,
    value,
    placeholderText,
    multiple,
    options,
    onChange,
    onClick,
    description,
    stringSelect,
    findByName,
    editId,
    photoEp,
    isFile,
    filePath,
    customFilePath,
    readonly,
    defaultValue,
    labelText,
    icon,
    iconClick,
    draggableInput
  }: Props,
) => {
  switch (type) {
    case 'select':
      return (
        <StyledSelect
          placeholder={placeholderText}
          multiple={multiple}
          name={name}
          size={multiple ? options?.length : 0}
          id={id || name || value}
          ref={register(isRequired && { required: 'To pole jest wymagane' })}
          onClick={onClick}
          onChange={onChange}
          required={isRequired}
          defaultValue="default"
          disabled={readonly}
        >
          <option disabled value="default">
            {' '}
            -- Wybierz --{' '}
          </option>
          {options &&
            options.length > 0 &&
            options.map((singleOption: any) => (
              <option
                key={stringSelect ? singleOption : singleOption?._id || singleOption?.text}
                value={stringSelect ? singleOption : singleOption?._id || singleOption?.name || singleOption?.value}
              >
                {stringSelect ? singleOption : singleOption?.text}
              </option>
            ))}
        </StyledSelect>
      );
    case 'checkbox':
      // for multiple chekboxes with same name in one page
      const random = new Date().getTime();
      return (
        <StyledCheckbox>
          <StyledCheckboxInput
            onChange={onChange}
            onClick={onClick}
            multiple={multiple}
            type={type}
            name={name}
            id={`${id || name}${random}`}
            ref={register(isRequired && { required: 'To pole jest wymagane' })}
            disabled={readonly}
          />
          {labelText && (
            <label htmlFor={`${name}${random}`}>
              {labelText}
              {isRequired && ' *'}
            </label>
          )}
          {/* <ChecboxMark /> */}
        </StyledCheckbox>
      );
    case 'textarea':
      return (
        <textarea
          onChange={onChange}
          onClick={onClick}
          name={name}
          id={id || name}
          ref={register(isRequired && { required: 'To pole jest wymagane' })}
          placeholder={placeholderText}
          disabled={readonly}
          value={value}
          defaultValue={defaultValue}
        >
          {value}
        </textarea>
      );
    case 'file':
      return (
        <>
          {!isFile && (
            <PhotoWrapper>
              {editId && findByName && findByName(name).length === 0 ? (
                <Image src={customFilePath || `${apiUrl}${filePath}/${name}/${editId}`} />
              ) : (
                findByName &&
                findByName(name)?.length > 0 &&
                findByName(name).map((photo) =>
                  photo.previewUrl.map((previewUrl) => <Image key={previewUrl} src={previewUrl} />),
                )
              )}
            </PhotoWrapper>
          )}
          <StyledFileInput
            isFile={isFile}
            onChange={onChange}
            onClick={onClick}
            multiple={multiple}
            type={type}
            name={name}
            id={id || name}
            ref={register(isRequired && { required: 'To pole jest wymagane' })}
            placeholder={placeholderText}
            accept={accept}
            disabled={readonly}
            onDrop={(e: any) => draggableInput && onChange && onChange(e)}
          />
        </>
      );
    default:
      return (
        <InputContainer>
          <input
            onChange={onChange}
            onClick={onClick}
            multiple={multiple}
            type={type}
            name={name}
            id={id || name}
            ref={register(isRequired && { required: 'To pole jest wymagane' })}
            placeholder={placeholderText}
            accept={accept}
            disabled={readonly}
            value={value}
            defaultValue={defaultValue}
          />
          {icon && (
            <InputIcon onClick={iconClick} type="button">
              <FontAwesomeIcon icon={icon} />
            </InputIcon>
          )}
        </InputContainer>
      );
  }
};

export const FormField: FC<Props> = ({
  type,
  labelText,
  isRequired,
  accept,
  name,
  id,
  editId,
  photoEp,
  isFile,
  placeholderText,
  field,
  children,
  multiple,
  options,
  onChange,
  onClick,
  description,
  stringSelect,
  filePath,
  customFilePath,
  findByName,
  defaultValue,
  fieldArrayName,
  readonly,
  icon,
  iconClick,
  mb0,
  value,
  draggableInput
}) => {
  const { register, errors } = useFormContext();
  const [isDragOver, setIsDragOver] = useState(false);
  const handleDragState = useCallback((state: boolean) => {
    setIsDragOver(state)
  }, [isDragOver])

  
  const errorMsg: keyof typeof translatedErrors = errors[name]?.message ?? '';
  const error = translatedErrors[errorMsg] ?? errorMsg;

  return (
    <StyledFormField
      icon={icon}
      customColor={type === 'color'}
      checkbox={type === 'checkbox'}
      textarea={type === 'textarea'}
      draggableInput={draggableInput}
      mb0={mb0}
    >
      <StyledWrapper>
        {labelText && type !== 'checkbox' && (
          <StyledInputLabel htmlFor={id || name}>
            {labelText}
            {isRequired && ' *'}
          </StyledInputLabel>
        )}
        {children}
        {React.isValidElement(field) ? (
          field
        ) : (
          <>
            {renderCorrectInput(register, {
              type,
              isRequired,
              accept,
              name,
              editId,
              isFile,
              id,
              placeholderText,
              multiple,
              options,
              onClick,
              onChange,
              description,
              stringSelect,
              filePath,
              customFilePath,
              findByName,
              defaultValue,
              readonly,
              labelText,
              icon,
              iconClick,
              value,
              draggableInput
            })}
            <StyledFormFieldError>{error}</StyledFormFieldError>
          </>
        )}
      </StyledWrapper>
    </StyledFormField>
  );
};
