import { Box, Center, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { CourseTableResContent } from '../../../app-types';

interface Props {
  courses: CourseTableResContent[];
}

const SimplyCourseTile: React.FC<Props> = ({ courses }) => (
  <>
    {courses.map((cours) => (
      <Link to={`/course/${cours.id}`}>
        <Box
          key={cours.id}
          maxW="250px"
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
            <h2>{cours.title}</h2>
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
    ))}
  </>
);

export default SimplyCourseTile;
