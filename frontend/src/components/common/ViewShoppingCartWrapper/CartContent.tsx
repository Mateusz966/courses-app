import { Button } from '@chakra-ui/button';
import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Currency, ShoppingCart } from '../../../app-types';
import { useApi } from '../../../hooks/useApi';
import SingleCourseInCart from './SingleCourseInCart';
import { useRootStore } from '../../../stores/storeContext';
import { BuyCoursesReq } from '../../../../../backend/app-types';

interface Props {
  cartPayload: ShoppingCart;
}

const CartContent: FC<Props> = observer(({ cartPayload }) => {
  const { post } = useApi();
  const {
    shoppingCart: { totalPrice },
  } = useRootStore();

  const courseList = cartPayload.course.map((course) => (
    <SingleCourseInCart
      key={course.id}
      id={course.id}
      title={course.title}
      price={course.price}
      currency={course.currency}
    />
  ));

  const buyButtonHandler = async ({ course }: ShoppingCart) => {
    await post<string, BuyCoursesReq>('/course/buy', {
      courses: course,
      totalPrice: Number(totalPrice),
      currency: Currency.PLN,
    });
  };
  return (
    <>
      ilość kursów w koszyku: {cartPayload.course.length}
      <Box h="1px" bgColor="#e2e2e2" />
      {courseList}
      <Box h="1px" bgColor="#e2e2e2" />
      <Flex flexDirection="row-reverse" m={6} p={3}>
        <Box>
          <Text>
            Łączna kwota: {totalPrice} {Currency.PLN}
          </Text>
          <Center>
            <Button onClick={() => buyButtonHandler(cartPayload)}>
              Zapłać
            </Button>
          </Center>
        </Box>
      </Flex>
    </>
  );
});

export default CartContent;
