import { IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { apiUrl } from '../../../config/apiUrl';
import { useRootStore } from '../../../stores/storeContext';

interface Props {
  id: string;
  title: string;
}

const SingleCourseInCart: FC<Props> = observer(({ id, title }) => {
  const {
    shopingCart: { deleteCourseFromCart },
  } = useRootStore();

  return (
    <Flex justifyContent="space-around" m={6} p={3} rounded="lg" boxShadow="xl">
      <Box w="250px">
        <Image
          boxSize="150px"
          src={`${apiUrl}/course/main-photo/${id}`}
          alt="avatar placeholder"
        />
      </Box>
      <Spacer />
      <Text w="full" m="auto" fontSize="24px">
        {title}
      </Text>
      <Spacer />
      <Box m="auto" w="200px" fontSize="24px">
        6.99zł
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
});

export default SingleCourseInCart;
