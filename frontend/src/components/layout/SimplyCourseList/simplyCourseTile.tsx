import { Box, Center, Grid, GridItem, Image } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { CourseTableResContent } from '../../../app-types';
import { apiUrl } from '../../../config/apiUrl';

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
          <Image src={`${apiUrl}/course/main-photo/${course.id}`} />
        </Box>
        <Center p="15px">
          <h2>{course.title}</h2>
        </Center>
        <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(1, 1fr)">
          <GridItem rowSpan={1} colSpan={1} p="10px">
            Author
          </GridItem>
          <GridItem rowSpan={1} colSpan={1} p="10px">
            Rating
          </GridItem>
          <GridItem rowSpan={1} colSpan={1} p="10px">
            Price
          </GridItem>
        </Grid>
      </Box>
    </Link>
  </Box>
);

export default SimplyCourseTile;
