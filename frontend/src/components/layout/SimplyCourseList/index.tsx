import { Container } from '@chakra-ui/react';
import { FC } from 'react';
import SimplyCourseTile from './simplyCourseTile';
import { useCourseByCategory } from '../../../hooks/useCoursesByCategory';

interface Props {
  categories?: string;
  subcategory?: string;
}

const SimplyCourseList: FC<Props> = ({ categories, subcategory }) => {
  const { courses, inProgress } = useCourseByCategory({
    subcategory,
    categories,
  });

  if (inProgress) {
    return <p>Loading ...</p>;
  }

  const coursesList = courses.map((course) => (
    <SimplyCourseTile key={course.id} course={course} />
  ));

  return <Container>{coursesList.length > 0 ? coursesList : null}</Container>;
};

export default SimplyCourseList;
