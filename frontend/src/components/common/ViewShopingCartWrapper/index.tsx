import { Flex, Container, Grid, Box, Text, Center } from '@chakra-ui/layout';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useRootStore } from '../../../stores/storeContext';
import CartContent from './CartContent';

export const ViewShopingCartWrapper: FC = observer(() => {
  const {
    shopingCart: { cartPayload },
  } = useRootStore();

  const cartInfo = (
    <Flex>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
        <Box h="10" />
        <Box h="10">
          <Center>
            <Text>Wygląda na to, że twój koszyk jest pusty</Text>
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
