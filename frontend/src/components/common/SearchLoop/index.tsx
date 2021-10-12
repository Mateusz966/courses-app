import React from 'react';
import {
  useDisclosure,
  HStack,
  Input,
  Box,
  InputGroup,
  InputLeftElement,
  Icon,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Grid,
  GridItem,
  Circle,
  Text,
  Link,
} from '@chakra-ui/react';
import { MdSearch, MdShoppingCart, MdClose } from 'react-icons/md';
import { useRootStore } from '../../../stores/storeContext';

export const SearchLoop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchField =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const {
    shoppingCart: { cartPayload },
  } = useRootStore();
  const cartCounter = (
    <GridItem
      position="absolute"
      mt="6"
      display={{ md: 'none', base: 'block' }}
    >
      <Circle size="5" color="#ffffff" bgColor="#4FD1C5">
        <Text fontSize="0.8rem" shadow="xl">
          {cartPayload.course.length}
        </Text>
      </Circle>
    </GridItem>
  );

  return (
    <HStack justifyContent="flex-end">
      <Box width="100%" display={{ md: 'block', base: 'none' }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon color="#CBD5E0" w="6" h="6" as={MdSearch} />
          </InputLeftElement>
          <Input placeholder="Type what you search" />
        </InputGroup>
      </Box>
      <IconButton
        bgColor="#fff"
        color="#4A5568"
        aria-label="Search"
        icon={<Icon w="6" h="6" as={MdSearch} />}
        display={{ md: 'none', base: 'block' }}
        onClick={onOpen}
      />
      <Drawer
        placement="top"
        onClose={onClose}
        isOpen={isOpen}
        initialFocusRef={searchField}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody>
              <HStack>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon color="#CBD5E0" w="6" h="6" as={MdSearch} />
                  </InputLeftElement>
                  <Input ref={searchField} placeholder="Type what you search" />
                </InputGroup>
                <IconButton
                  bgColor="#fff"
                  color="#4A5568"
                  aria-label="Shopping Cart"
                  icon={<Icon w="6" h="6" as={MdClose} />}
                  display={{ md: 'none', base: 'block' }}
                />
              </HStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Link to="/dashboard/cart">
        <Grid templateColumns="repeat(1, 1fr)">
          <GridItem>
            <IconButton
              bgColor="#fff"
              color="#4A5568"
              aria-label="Shopping Cart"
              icon={<Icon w="6" h="6" as={MdShoppingCart} />}
              display={{ md: 'none', base: 'block' }}
            />
          </GridItem>
          {cartPayload.course.length > 0 && cartCounter}
        </Grid>
      </Link>
    </HStack>
  );
};
