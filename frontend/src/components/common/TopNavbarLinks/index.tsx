import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Link,
} from '@chakra-ui/react';
import { FC, lazy } from 'react';
import { history } from '../../../config/history';


export const TopNavbarLinks: FC = () => (
  <Box>
    <Menu>
      <MenuButton bgColor="#fff" color="#333" as={Button}>
        Categories
      </MenuButton>
      <MenuList fontSize="16px">
        <MenuItem>Sample category</MenuItem>
        <MenuItem>Sample category</MenuItem>
      </MenuList>
    </Menu>
  </Box>
);
