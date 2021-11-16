import { Box, Text, Accordion } from '@chakra-ui/react';
import { FC } from 'react';
import { Section } from '../../../app-types';
import CourseSyllabusContent from '../PurchasedCourseSyllabus/courseSyllabusContent';

interface Props {
  sections: Section[];
  title: string;
  courseId: string;
  lessonId: string;
}

const PurchasedCourseSidebar: FC<Props> = ({
  sections,
  title,
  courseId,
  lessonId,
}) => {
  const syllabusContent = sections.map((section, index) => (
    <CourseSyllabusContent
      sections={section}
      currentIndex={index}
      courseId={courseId}
    />
  ));
  let currentSectionIndex = 0;
  // find active section index for accordion
  sections.forEach((element, i) => {
    element.lesson.forEach((singleLesson) => {
      if (singleLesson.id === lessonId) {
        currentSectionIndex = i;
      }
    });
  });

  return (
    <Box pos="sticky" top="15px">
      <Box>
        <Text color="gray.400" fontSize="21px" mb="3">
          {title}
        </Text>
      </Box>
      <Box>
        <Accordion allowMultiple defaultIndex={[currentSectionIndex]}>
          {syllabusContent}
        </Accordion>
      </Box>
    </Box>
  );
};
export default PurchasedCourseSidebar;
