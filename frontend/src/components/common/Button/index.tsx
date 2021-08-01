import { FC } from 'react';
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

interface Props extends ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  variant?: 'outline';
  loadingText?: string;
  disabled?: boolean;
  inProgress?: boolean;
  type?: 'submit' | 'button';
  mt0?: boolean;
  onClick?: () => void;
  dataCy?: string;
  ref?: any;
}

export const Button: FC<Props> = ({
  children,
  variant,
  disabled,
  inProgress,
  type = 'button',
  mt0,
  onClick,
  dataCy,
  ref,
  ...props
}) => (
  <ChakraButton
    type={type}
    disabled={disabled || inProgress}
    mt={mt0 ? 0 : 6}
    w="100%"
    borderRadius="25px"
    isLoading={inProgress}
    loadingText="Submitting"
    colorScheme="teal"
    variant={variant}
    onClick={onClick}
    data-cy={dataCy}
    ref={ref}
    {...props}
  >
    {children}
  </ChakraButton>
);
