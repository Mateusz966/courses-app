import { Button } from '@chakra-ui/button';
import { Box, Flex, Text, Heading } from '@chakra-ui/layout';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import {
  BoughtCoursesReq,
  BuyCoursesReq,
  Currency,
  ShoppingCart,
} from '../../../app-types';
import { useApi } from '../../../hooks/useApi';
import SingleCourseInCart from './SingleCourseInCart';
import { useRootStore } from '../../../stores/storeContext';
import { history } from '../../../config/history';

interface Props {
  cartPayload: ShoppingCart;
}

const CartContent: FC<Props> = observer(({ cartPayload }) => {
  const { post } = useApi();
  const {
    shoppingCart: { totalPrice, deleteAllCourseFromCart },
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
    const res = await post<BoughtCoursesReq, BuyCoursesReq>('/course/buy', {
      courses: course,
      totalPrice: Number(totalPrice),
      currency: Currency.PLN,
    });
    if (res && res.paymentStatus === 'OK') {
      deleteAllCourseFromCart();
      history.push('/dashboard/course/bought');
    }
  };
  return (
    <>
      <Heading
        as="h1"
        fontSize="32px"
        mt={{ lg: '80px', base: '20px' }}
        mb="20px"
      >
        Ilość kursów w koszyku:{' '}
        <Text d="inline" color="#2c7a7b">
          {cartPayload.course.length}
        </Text>
      </Heading>
      {courseList}
      <Flex flexDirection="row-reverse" m={6} p={3}>
        <Box textAlign="right">
          <Text fontSize="21px">
            Łączna kwota: {totalPrice} {Currency.PLN}
          </Text>
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => buyButtonHandler(cartPayload)}
            mt="3"
          >
            Zapłać
          </Button>
        </Box>
      </Flex>
    </>
  );
});

export default CartContent;
