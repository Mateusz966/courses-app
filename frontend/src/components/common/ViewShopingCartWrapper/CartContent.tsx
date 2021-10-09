import { Button } from '@chakra-ui/button';
import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { ShopingCart } from '../../../app-types';
import SingleCourseInCart from './SingleCourseInCart';

interface Props {
  cartPayload: ShopingCart;
}

const CartContent: FC<Props> = observer(({ cartPayload }) => {
  const courseList = cartPayload.course.map((course) => (
    <SingleCourseInCart key={course.id} id={course.id} title={course.title} />
  ));
  return (
    <>
      ilość kursów w koszyku: {cartPayload.course.length}
      <Box h="1px" bgColor="#e2e2e2" />
      {courseList}
      <Box h="1px" bgColor="#e2e2e2" />
      <Flex flexDirection="row-reverse" m={6} p={3}>
        <Box>
          <Text>Łączna kwota: XXX</Text>
          <Center>
            <Button>Zapłać</Button>
          </Center>
        </Box>
      </Flex>
    </>
  );
});

export default CartContent;
