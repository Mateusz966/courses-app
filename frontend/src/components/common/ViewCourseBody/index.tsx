import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { ViewCourseLongDesc } from '../ViewCourseLongDesc';
import { CourseSyllabus } from '../CourseSyllabus';

export const ViewCourseBody: FC = () => (
  <Box mt="8">
    <CourseSyllabus />
    <ViewCourseLongDesc />
  </Box>
);
