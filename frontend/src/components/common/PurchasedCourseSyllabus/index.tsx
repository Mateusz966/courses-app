import { Accordion, Box, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { Section } from '../../../app-types';
import CourseSyllabusContent from './courseSyllabusContent';

interface Props {
  sections: Section[];
  courseId: string;
}
export const CourseSyllabus: FC<Props> = ({ sections, courseId }) => {
  const syllabusContent = sections.map((section, index) => (
    <CourseSyllabusContent
      sections={section}
      currentIndex={index}
      courseId={courseId}
    />
  ));
  return (
    <Box>
      <Heading as="h2" size="lg" mb="7">
        Program kursu
      </Heading>
      <Accordion allowMultiple>{syllabusContent}</Accordion>
    </Box>
  );
};
