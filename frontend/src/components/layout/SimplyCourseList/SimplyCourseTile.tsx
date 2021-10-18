import { Box, Center, Grid, GridItem, Image } from '@chakra-ui/react';
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
          boxShadow="md"
          _hover={{
            boxShadow: 'xl',
          }}
        >
          <Link to={`/dashboard/course/view/${id}`}>
            <Box height="150px" width="250px">
              <Image src={`${apiUrl}/course/main-photo/${id}`} />
            </Box>
            <Center p="15px">
              <h2>{title}</h2>
            </Center>
            <Grid
              templateRows="repeat(3, 1fr)"
              templateColumns="repeat(1, 1fr)"
            >
              <GridItem rowSpan={1} colSpan={1} p="10px">
                {firstName} {lastName}
              </GridItem>
              <GridItem rowSpan={1} colSpan={1} p="10px">
                {price} {currency}
              </GridItem>
            </Grid>
          </Link>
          <Button onClick={() => addToCart({ id, title, price, currency })}>
            Add to cart
          </Button>
        </Box>
      </Box>
    );
  },
);

export default SimplyCourseTile;
