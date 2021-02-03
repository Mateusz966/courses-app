import { Box, IconButton, Icon, HStack } from '@chakra-ui/react';
import React from 'react';
import { FC } from 'react';
import { LoggedActions } from './LoggedActions';
import { NotLoggedActions } from './NotLoggedActions';
import { MdShoppingCart } from 'react-icons/md';

interface Props {
  justifyContentType?: string;
}

export const NavUserActions: FC<Props> = ({
  justifyContentType
}) => {
  //TODO SETUP MOBX

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
        {true ? <LoggedActions justifyContentType={justifyContentType} /> : <NotLoggedActions justifyContentType={justifyContentType} />}
      </HStack>
    </Box>
  );
};
