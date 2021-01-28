import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { MdKeyboardArrowDown, MdShoppingCart } from 'react-icons/md';

export const LoggedActions = () => {
  return (
    <HStack>
      <IconButton
        bgColor="#fff"
        aria-label="Shopping Cart"
        icon={<Icon w="6" h="6" as={MdShoppingCart} />}
      />
      <Menu>
        <MenuButton
          bgColor="#4FD1C5"
          color="#fff"
          as={Button}
          rightIcon={<MdKeyboardArrowDown />}
        >
          Moje konto
        </MenuButton>
        <MenuList>
          <MenuItem>Moje kursy</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
