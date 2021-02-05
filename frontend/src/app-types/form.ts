export interface BaseInputProps {
  placeholder?: string;
  id?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  onChange?: <T>(e: T) => void;
  onClick?: <T>(e: T) => void;
  name?: string;
}
