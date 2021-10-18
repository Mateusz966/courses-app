import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Icon,
  Text,
  Circle,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { MdKeyboardArrowDown, MdShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useRootStore } from '../../../../stores/storeContext';

interface Props {
  justifyContentType?: string;
}

export const LoggedActions: FC<Props> = observer(({ justifyContentType }) => {
  const {
    shoppingCart: { cartPayload },
  } = useRootStore();
  const cartCounter = (
    <GridItem position="absolute" mt="6">
      <Circle size="5" color="#ffffff" bgColor="#4FD1C5">
        <Text fontSize="0.8rem" shadow="xl">
          {cartPayload.course.length}
        </Text>
      </Circle>
    </GridItem>
  );

  return (
    <HStack justifyContent={justifyContentType}>
      <Link to="/dashboard/cart">
        <Grid templateColumns="repeat(1, 1fr)">
          <GridItem>
            <IconButton
              bgColor="#fff"
              color="#4A5568"
              aria-label="Shopping Cart"
              icon={<Icon w="6" h="6" as={MdShoppingCart} />}
              display={{ md: 'block', base: 'none' }}
            />
          </GridItem>
          {cartPayload.course.length > 0 && cartCounter}
        </Grid>
      </Link>
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
          <MenuItem as={Link} to="/dashboard/course/manage">
            Moje kursy
          </MenuItem>
          <MenuItem as={Link} to="/dashboard/creator-zone">
            Strefa twórcy
          </MenuItem>
          <MenuItem as={Link} to="/dashboard/cart">
            Koszyk
          </MenuItem>
          <MenuItem as={Link} to="/dashboard/profile">
            Mój Profil
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
});
