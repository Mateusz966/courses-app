import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  IconButton,
  Icon,
  HStack,
  UnorderedList,
  ListItem,
  Box,
  Image
} from '@chakra-ui/react';
import { useRef } from 'react';
import { MdMenu } from 'react-icons/md';
import { NavUserActions } from '../NavUserActions';
import BrandLogo from '../../../assets/brand-logo.png';

export const MainDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <HStack>
        <IconButton
          aria-label="MainMenu"
          ref={btnRef}
          color="#fff"
          bgColor="#fff"
          onClick={onOpen}
          icon={<Icon w={6} h={6} as={MdMenu} color="#4FD1C5" />}
          display={{ md: 'none', base: 'block' }}
        />
        
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader justifyContent="start" borderBottom="1px solid #eee">
                <NavUserActions justifyContentType={'flex-start'} />
              </DrawerHeader>
              <DrawerBody>           
                <UnorderedList listStyleType="none" ml="0">
                  <ListItem>Sample category</ListItem>
                  <ListItem>Sample category</ListItem>
                  <ListItem>Sample category</ListItem>
                  <ListItem>Sample category</ListItem>
                </UnorderedList>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
        <Box mr="3">
          <Image src={BrandLogo} margin="auto" objectFit="cover" />
        </Box>
      </HStack>    
    </>
  );
};
