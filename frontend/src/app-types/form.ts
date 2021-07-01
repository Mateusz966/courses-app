export interface BaseInputProps {
  placeholder?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  onChange?: <T>(e: T) => void;
  onClick?: <T>(e: T) => void;
}
