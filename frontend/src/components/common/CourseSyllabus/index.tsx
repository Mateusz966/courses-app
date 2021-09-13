import { Accordion, Box, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import CourseSyllabusContent from './courseSyllabusContent';

export const CourseSyllabus: FC = () => (
  <Box>
    <Heading as="h2" size="lg" mb="7">
      Program kursu
    </Heading>
    <Accordion allowMultiple>
      <CourseSyllabusContent />
    </Accordion>
  </Box>
);
