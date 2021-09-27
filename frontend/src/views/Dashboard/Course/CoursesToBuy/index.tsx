import { Center, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { useCourseClient } from '../../../../hooks/course/useCourseClient';
import SimplyCourseTile from '../../../../components/layout/SimplyCourseList/simplyCourseTile';
import { Container } from '../../../../components/layout/Container';
import CoursesFilters from '../../../../components/common/CoursesFilters';

const CoursesToBuy: FC = () => {
  const { initFetch, inProgress, courses } = useCourseClient();

  const coursesList = courses.map((course) => (
    <SimplyCourseTile key={course.id} course={course} />
  ));

  if (inProgress && initFetch) {
    return <p>Loading ...</p>;
  }

  return (
    <Container>
      {coursesList.length > 0 ? (
        <Grid templateColumns="200px 1fr">
          <GridItem>
            <CoursesFilters />
          </GridItem>
          <GridItem>
            <Grid
              gap={6}
              templateColumns={['1fr', null, '1fr 1fr', '1fr 1fr 1fr']}
            >
              {coursesList}
            </Grid>
          </GridItem>
        </Grid>
      ) : (
        <p>Nie ma kursów do wyświetlenia</p>
      )}
      <Center>{inProgress && !initFetch && <p>Loading ...</p>}</Center>
    </Container>
  );
};

export default CoursesToBuy;
