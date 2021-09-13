import { Box } from '@chakra-ui/react';
import React from 'react';
import { ViewCourseLongDesc } from '../ViewCourseLongDesc';
import { CourseSyllabus } from '../CourseSyllabus';

interface Props {
  content: string;
}

export const ViewCourseBody: React.FC<Props> = ({ content }) => (
  <Box mt="8">
    <CourseSyllabus />
    <ViewCourseLongDesc content={content} />
  </Box>
);
