import { Box, Image, Text, HStack, Button, Icon } from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';
import React from 'react';
import { apiUrl } from '../../../config/apiUrl';

interface Props {
  photoId: string;
}

export const ViewCourseSidebar: React.FC<Props> = ({ photoId }) => (
  <Box boxShadow="lg" border="1px solid #DDD" position="sticky" top="15px">
    <Image src={`${apiUrl}/course/main-photo/${photoId}`} />
    <Box p="4">
      <HStack>
        <Text color="red.500" fontSize="32px" fontWeight="600">
          459 zł
        </Text>
        <Text color="gray.400" textDecoration="line-through" fontSize="24px">
          1500 zł
        </Text>
      </HStack>
      <Text color="red.600">Promocja kończy się za 3 godziny!</Text>
      <Button
        mt="5"
        leftIcon={<Icon w="5" h="5" as={MdShoppingCart} />}
        colorScheme="teal"
        variant="solid"
        size="lg"
        w="100%"
      >
        Dodaj do koszyka
      </Button>
    </Box>
  </Box>
);
