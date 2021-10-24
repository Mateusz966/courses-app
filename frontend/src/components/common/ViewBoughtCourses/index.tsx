import { Center, Container, Divider, Grid, GridItem } from '@chakra-ui/layout';
import { FC, useEffect, useState } from 'react';
import { CourseTableRes, CourseTableResContent } from '../../../app-types';
import { useApi } from '../../../hooks/useApi';
import BougthCourseTile from './BougthCourseTile';

const ViewBoughtCourses: FC = () => {
  const { get } = useApi();
  const [course, setCourses] = useState<CourseTableResContent[]>([]);

  const getCourses = async () => {
    const res = await get<CourseTableRes>('/course/bought');
    if (res) {
      setCourses(res.items);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const boughtTiles = course.map((singleCourse) => (
    <BougthCourseTile course={singleCourse} />
  ));

  return (
    <Container width="100%" maxW="1500px">
      <Grid templateColumns={['repeat(3, 1fr)', null, 'repeat(5, 1fr)']}>
        <GridItem colStart={[1, 2, 2]} colSpan={3} m={6} p={6}>
          <Center>Obecnie posiadasz {course.length} kursów</Center>
          <Divider m={6} />
        </GridItem>
        <GridItem colStart={[1, null, 2]} colSpan={3}>
          <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(3, 1fr)']}>
            {course.length > 0 ? boughtTiles : ' '}
          </Grid>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ViewBoughtCourses;
