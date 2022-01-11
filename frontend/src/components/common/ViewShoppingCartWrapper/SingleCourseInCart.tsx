import { IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { apiUrl } from '../../../config/apiUrl';
import { useRootStore } from '../../../stores/storeContext';
import { Currency } from '../../../app-types';

interface Props {
  id: string;
  title: string;
  price: number;
  currency: Currency;
}

const SingleCourseInCart: FC<Props> = observer(
  ({ id, title, price, currency }) => {
    const {
      shoppingCart: { deleteCourseFromCart },
    } = useRootStore();

    return (
      <Flex
        justifyContent="space-around"
        m={6}
        p={3}
        rounded="lg"
        boxShadow="xl"
      >
        <Image
          boxSize="110px"
          src={`${apiUrl}/course/main-photo/${id}`}
          alt="avatar placeholder"
        />
        <Spacer />
        <Text w="full" m="auto" fontSize="24px" ml="3">
          {title}
        </Text>
        <Spacer />
        <Box m="auto" w="200px" fontSize="24px">
          {price} {currency}
        </Box>
        <Spacer />
        <Box m="auto" w="80px">
          <IconButton
            rounded="lg"
            onClick={() => deleteCourseFromCart(id)}
            aria-label="Delete from cart"
            icon={<IoMdTrash />}
          />
        </Box>
      </Flex>
    );
  },
);

export default SingleCourseInCart;
