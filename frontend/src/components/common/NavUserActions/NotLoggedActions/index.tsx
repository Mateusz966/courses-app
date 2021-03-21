import { FC } from 'react';
import { HStack, Box } from '@chakra-ui/react';
import React from 'react';
import { history } from '../../../../config/history';
import { Button } from '../../Button';

interface Props {
  justifyContentType?: string;
}

export const NotLoggedActions: FC<Props> = ({ justifyContentType }) => {
  return (
    <HStack justifyContent={justifyContentType}>
      <Box>
        <Button
          mt0
          type="button"
          variant="outline"
          onClick={() => history.push('/sign-in')}
        >
          Sign In
        </Button>
      </Box>
      <Box>
        <Button
          mt0
          type="button"
          onClick={() => history.push('/sign-up')}
        >
          Sign Up
        </Button>
      </Box>
    </HStack>
  );
};
