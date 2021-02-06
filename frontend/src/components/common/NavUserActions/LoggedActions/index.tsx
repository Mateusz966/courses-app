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
import { FC } from 'react';
import { MdKeyboardArrowDown, MdShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface Props {
  justifyContentType?: string;
}

export const LoggedActions: FC<Props> = ({ justifyContentType }) => {
  return (
    <HStack justifyContent={justifyContentType}>
      <IconButton
        bgColor="#fff"
        color="#4A5568"
        aria-label="Shopping Cart"
        icon={<Icon w="6" h="6" as={MdShoppingCart} />}
        display={{ md: 'block', base: 'none' }}
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
        <MenuList fontSize="16px">
          <MenuItem as={Link} to="/dashboard/course/add" >Moje kursy</MenuItem>
          <MenuItem>Ustawienia</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
