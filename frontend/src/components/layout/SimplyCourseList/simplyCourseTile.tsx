import { Box, Center, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { CourseTableResContent } from '../../../app-types';
import { Button } from '../../common/Button';

interface Props {
  course: CourseTableResContent;
}

const SimplyCourseTile: React.FC<Props> = ({ course }) => (
  <Box ml="25%" maxW="250px" key={course.id}>
    <Link to={`dashboard/course/view/${course.id}`}>
      <Box
        minH="320px"
        mt="20px"
        mb="20px"
        boxShadow="md"
        _hover={{
          boxShadow: 'xl',
        }}
      >
        <Box height="150px" width="250px">
          <img src="" alt="Course im placeholder" />
        </Box>
        <Center p="15px">
          <h2>{course.title}</h2>
        </Center>
        <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(1, 1fr)">
          <GridItem rowSpan={1} colSpan={1} p="10px">
            Author
          </GridItem>
          <GridItem rowSpan={1} colSpan={1} p="10px">
            Price
          </GridItem>
          <Button>Add to cart</Button>
        </Grid>
      </Box>
    </Link>
  </Box>
);

export default SimplyCourseTile;
