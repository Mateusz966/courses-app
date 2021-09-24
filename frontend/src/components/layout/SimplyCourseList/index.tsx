import { Center, Container } from '@chakra-ui/react';
import { FC } from 'react';
import SimplyCourseTile from './simplyCourseTile';
import { useCourseClient } from '../../../hooks/course/useCourseClient';

const SimplyCourseList: FC = () => {
  const { initFetch, inProgress, courses, totalNumberOfCourses } =
    useCourseClient();

  const coursesList = courses.map((course) => (
    <SimplyCourseTile key={course.id} course={course} />
  ));

  if (inProgress && initFetch) {
    return <p>Loading ...</p>;
  }

  return (
    <Container>
      <Center>Liczba wszystkich kursów:{totalNumberOfCourses}</Center>
      {coursesList.length > 0 ? (
        coursesList
      ) : (
        <p>Nie ma kursów do wyświetlenia</p>
      )}
      <Center>{inProgress && !initFetch && <p>Loading ...</p>}</Center>
    </Container>
  );
};

export default SimplyCourseList;
