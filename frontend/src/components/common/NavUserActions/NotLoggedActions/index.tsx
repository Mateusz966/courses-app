import { HStack } from '@chakra-ui/react';
import React from 'react';
import { Button } from '../../Button';

export const NotLoggedActions = () => {
  return (
    <HStack>
      <Button isValid type="button">
        Sign Up
      </Button>
      <Button isValid type="button" variant="outline">
        Sign Up
      </Button>
    </HStack>
  );
};
