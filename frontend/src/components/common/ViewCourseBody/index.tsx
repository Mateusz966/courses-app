import { Box } from '@chakra-ui/react';
import React from 'react';
import { ViewCourseLongDesc } from '../ViewCourseLongDesc';
import { CourseSyllabus } from '../CourseSyllabus';
import { Section } from '../../../app-types';

interface Props {
  content: string;
  sections: Section[];
}

export const ViewCourseBody: React.FC<Props> = ({ content, sections }) => (
  <Box mt="8">
    <CourseSyllabus sections={sections} />
    <ViewCourseLongDesc content={content} />
  </Box>
);
