import { SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import SimplyCourseTile from './SimplyCourseTile';
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

  return (
    <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
      {coursesList.length > 0 ? coursesList : null}
    </SimpleGrid>
  );
};

export default SimplyCourseList;
