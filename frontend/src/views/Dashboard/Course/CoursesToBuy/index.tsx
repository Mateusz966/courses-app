import { Center, Grid, GridItem } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import SimplyCourseTile from '../../../../components/layout/SimplyCourseList/simplyCourseTile';
import { Container } from '../../../../components/layout/Container';
import CoursesFilters from '../../../../components/common/CoursesFilters';
import { courseClientsStore } from '../../../../stores/courseClients';

const CoursesToBuy: FC = observer(() => {
  useEffect(() => {
    courseClientsStore.getCourses();
  }, [courseClientsStore.offset]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (
        courseClientsStore.courses.length <
        courseClientsStore.totalNumberOfCourses
      ) {
        courseClientsStore.setOffset();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [courseClientsStore.courses, courseClientsStore.totalNumberOfCourses]);

  const coursesList = courseClientsStore.courses.map((course) => (
    <SimplyCourseTile key={course.id} course={course} />
  ));

  if (courseClientsStore.inProgress && courseClientsStore.initFetch) {
    return <p>Loading ...</p>;
  }

  return (
    <Container>
      <Grid templateColumns="200px 1fr">
        <GridItem>
          <CoursesFilters />
        </GridItem>
        {coursesList.length > 0 ? (
          <GridItem>
            <Grid
              gap={6}
              templateColumns={['1fr', null, '1fr 1fr', '1fr 1fr 1fr']}
            >
              {coursesList}
            </Grid>
          </GridItem>
        ) : (
          <p>Nie ma kursów do wyświetlenia</p>
        )}
      </Grid>

      <Center>
        {courseClientsStore.inProgress && !courseClientsStore.initFetch && (
          <p>Loading ES...</p>
        )}
      </Center>
    </Container>
  );
});

export default CoursesToBuy;
