import { Container } from '@chakra-ui/react';
import { Props } from 'framer-motion/types/types';
import { FC, useEffect, useState } from 'react';
import { CourseTableRes, CourseTableResContent } from '../../../app-types';
import { useApi } from '../../../hooks/useApi';
import SimplyCourseTile from './simplyCourseTile';

const SimplyCourseList: FC<Props> = () => {
  const [courses, setCourses] = useState<CourseTableResContent[]>([]);
  const { get } = useApi();

  const getCourses = async () => {
    const res = await get<CourseTableRes>('course/created/all?offset=0');
    if (res) {
      setCourses(res.items);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <Container>
      <SimplyCourseTile courses={courses} />
    </Container>
  );
};

export default SimplyCourseList;
