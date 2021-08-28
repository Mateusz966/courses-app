import { Box, IconButton, Icon, HStack } from '@chakra-ui/react';
import React, { FC } from 'react';

import { MdShoppingCart } from 'react-icons/md';
import { observer } from 'mobx-react-lite';
import { LoggedActions } from './LoggedActions';
import { NotLoggedActions } from './NotLoggedActions';
import { useRootStore } from '../../../stores/storeContext';

interface Props {
  justifyContentType?: string;
}

export const NavUserActions: FC<Props> = observer(({ justifyContentType }) => {
  const { userStore } = useRootStore();

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
        {userStore.user?.details ? (
          <LoggedActions justifyContentType={justifyContentType} />
        ) : (
          <NotLoggedActions justifyContentType={justifyContentType} />
        )}
      </HStack>
    </Box>
  );
});
