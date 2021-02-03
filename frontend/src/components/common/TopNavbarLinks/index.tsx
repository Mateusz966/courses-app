import { Box, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { FC } from 'react';

export const TopNavbarLinks: FC = () => {
  return (
    <Box>
      <Menu>
        <MenuButton
          bgColor="#fff"
          color="#333"
          as={Button}
        >
          Categories
        </MenuButton>
        <MenuList  fontSize="16px">
          <MenuItem>Sample category</MenuItem>
          <MenuItem>Sample category</MenuItem>
        </MenuList>
      </Menu> 
    </Box>
  );
};
