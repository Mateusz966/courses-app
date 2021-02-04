import { FC } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

interface Props {
  primary?: boolean;
  secondary?: boolean;
  variant?: 'outline';
  loadingText?: string;
  isValid?: boolean;
  inProgress?: boolean;
  type: 'submit' | 'button';
  mt0?: boolean;
  onClick?: any;
}

export const Button: FC<Props> = ({
  children,
  primary,
  secondary,
  variant,
  isValid,
  inProgress,
  type,
  mt0,
  onClick
}) => {
  return (
    <ChakraButton
      type={type}
      disabled={!isValid || inProgress}
      mt={mt0 ? 0 : 6}
      w="100%"
      borderRadius="25px"
      isLoading={inProgress}
      loadingText="Submitting"
      colorScheme="teal"
      variant={variant}
      onClick={onClick}
    >
      {children}
    </ChakraButton>
  );
};
