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
}

export const Button: FC<Props> = ({
  children,
  primary,
  secondary,
  variant,
  isValid,
  inProgress,
  type,
}) => {
  return (
    <ChakraButton
      type={type}
      disabled={!isValid || inProgress}
      mt={6}
      w="100%"
      borderRadius="25px"
      isLoading={inProgress}
      loadingText="Submitting"
      colorScheme="teal"
      variant={variant}
    >
      {children}
    </ChakraButton>
  );
};
