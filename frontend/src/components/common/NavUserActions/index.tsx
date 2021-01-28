import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../config/store';
import { LoggedActions } from './LoggedActions'
import { NotLoggedActions } from './NotLoggedActions';


export const NavUserActions = () => {
  const user = useSelector((state: RootState) => state.user?.details);
  
  return (
    <Box>
      {user ? <LoggedActions /> : <NotLoggedActions />}
    </Box>
  );
};
