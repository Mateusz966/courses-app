export interface BaseInputProps {
    id?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    isInvalid?: boolean;
    name: string;
    onChange?: <T>(e: T) => void;
    onClick?: <T>(e: T) => void;
}
