import { Center, Container } from '@chakra-ui/react';
import { useCourseClient } from '../../../../hooks/course/useCourseClient';
import SimplyCourseTile from '../../../../components/layout/SimplyCourseList/simplyCourseTile';

const CoursesToBuy = () => {
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
        coursesList
      ) : (
        <p>Nie ma kursów do wyświetlenia</p>
      )}
      <Center>{inProgress && !initFetch && <p>Loading ...</p>}</Center>
    </Container>
  );
};

export default CoursesToBuy;
