import { Box, IconButton, Icon, HStack } from '@chakra-ui/react';
import React from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../config/store';
import { LoggedActions } from './LoggedActions';
import { NotLoggedActions } from './NotLoggedActions';
import { MdShoppingCart } from 'react-icons/md';

interface Props {
  justifyContentType?: string;
}

export const NavUserActions: FC<Props> = ({
  justifyContentType
}) => {
  const user = useSelector((state: RootState) => state.user?.details);

  return (
    <Box>
      <HStack justifyContent={justifyContentType}>
        <IconButton
          bgColor="#fff"
          color="#4A5568"
          aria-label="Shopping Cart"
          icon={<Icon w="6" h="6" as={MdShoppingCart} />}
          display={{ md: 'block', base: 'none' }}
        />
        {user ? <LoggedActions justifyContentType={justifyContentType} /> : <NotLoggedActions justifyContentType={justifyContentType} />}
      </HStack>
    </Box>
  );
};
