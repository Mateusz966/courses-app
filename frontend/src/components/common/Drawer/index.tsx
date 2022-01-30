import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  IconButton,
  Icon,
  HStack,
  Box,
  Image,
  Link,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link as RLink } from 'react-router-dom';
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
              <DrawerHeader
                justifyContent="start"
                borderBottom="1px solid #eee"
              >
                <NavUserActions justifyContentType="flex-start" />
              </DrawerHeader>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
        <Box mr="3">
          <Link as={RLink} to="/home">
            <Image src={BrandLogo} margin="auto" objectFit="cover" />
          </Link>
        </Box>
      </HStack>
    </>
  );
};
