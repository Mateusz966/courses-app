import { Box, Image, Text, HStack, Button, Icon } from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { apiUrl } from '../../../config/apiUrl';
import { useRootStore } from '../../../stores/storeContext';

interface Props {
  id: string;
  title: string;
}

export const ViewCourseSidebar: React.FC<Props> = observer(({ id, title }) => {
  const {
    shoppingCart: { addToCart },
  } = useRootStore();
  return (
    <Box boxShadow="lg" border="1px solid #DDD" position="sticky" top="15px">
      <Image src={`${apiUrl}/course/main-photo/${id}`} />
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
          onClick={() => addToCart({ id, title })}
        >
          Dodaj do koszyka
        </Button>
      </Box>
    </Box>
  );
});
