import { Flex, Container, Grid, Box, Heading, Center } from '@chakra-ui/layout';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useRootStore } from '../../../stores/storeContext';
import CartContent from './CartContent';

export const ViewShoppingCartWrapper: FC = observer(() => {
  const {
    shoppingCart: { cartPayload },
  } = useRootStore();

  const cartInfo = (
    <Flex>
      <Grid templateColumns="repeat(1, 1fr)" gap={6} w="100%">
        <Box h="10" />
        <Box h="10">
          <Center>
            <Heading
              as="h1"
              fontSize="32px"
              mt={{ lg: '80px', base: '20px' }}
              mb="20px"
            >
              Wygląda na to, że twój koszyk jest pusty
            </Heading>
          </Center>
        </Box>
        <Box />
      </Grid>
    </Flex>
  );

  return (
    <Container width="100%" maxW="1500px">
      {cartPayload.course.length > 0 ? (
        <CartContent cartPayload={cartPayload} />
      ) : (
        cartInfo
      )}
    </Container>
  );
});
