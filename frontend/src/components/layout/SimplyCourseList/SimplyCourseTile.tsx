import { Box, Heading, Text, Image } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { PublishedCourseRes } from '../../../app-types';
import { Button } from '../../common/Button';
import { apiUrl } from '../../../config/apiUrl';
import { useRootStore } from '../../../stores/storeContext';

interface Props {
  course: PublishedCourseRes;
}

const SimplyCourseTile: React.FC<Props> = observer(
  ({
    course: {
      id,
      title,
      price,
      currency,
      user: { firstName, lastName },
    },
  }) => {
    const {
      shoppingCart: { addToCart },
    } = useRootStore();
    return (
      <Box key={id}>
        <Box
          minH="320px"
          mt="20px"
          mb="20px"
          transition="all 250ms"
          pl="10px"
          _hover={{
            boxShadow: 'md',
            cursor: 'pointer',
          }}
        >
          <Link to={`/dashboard/course/view/${id}`}>
            <Box>
              <Image
                src={`${apiUrl}/course/main-photo/${id}`}
                margin="auto"
                p="30px"
              />
            </Box>
            <Text color="#555" fontSize="16px" mt="0.5rem">
              {firstName} {lastName}
            </Text>
            <Heading
              as="h2"
              color="teal.600"
              fontSize="18px"
              fontWeight="600"
              mt="0.5rem"
            >
              {title}
            </Heading>
            <Text color="red.500" fontSize="21px" mt="0.5rem" fontWeight="500">
              {price} {currency}
            </Text>
          </Link>
          <Box p="4" pl="0" pb="2">
            <Button
              onClick={() => addToCart({ id, title, price, currency })}
              mt0
              mb="3"
              d="inline-block"
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </Box>
    );
  },
);

export default SimplyCourseTile;
