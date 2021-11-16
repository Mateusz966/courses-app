import { FC } from 'react';
import {
  Box,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  Heading,
  List,
  Text,
} from '@chakra-ui/react';
import { Section } from '../../../app-types';
import SyllabusLesson from './syllabusLesson';

interface Props {
  sections: Section;
  currentIndex: number;
  courseId: string;
}
const CourseSyllabusContent: FC<Props> = ({
  sections: { id, title, description, lesson },
  currentIndex,
  courseId,
}) => {
  const itemList = lesson.map(({ id: lId, title: lTitle }) => (
    <SyllabusLesson id={lId} title={lTitle} courseId={courseId} />
  ));
  const currentIndexPlusOne = currentIndex + 1;

  return (
    <AccordionItem key={id}>
      <Heading as="h3">
        <AccordionButton
          bg="gray.100"
          pt="3"
          pb="3"
          fontWeight="500"
          fontSize="18px"
          _expanded={{ bg: 'gray.500', color: 'white' }}
        >
          <Box flex="1" textAlign="left">
            {currentIndexPlusOne}. {title}
            <Text fontSize="14px" color="teal.400" mt="3px">
              {description}
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel
        pb={5}
        borderLeft="1px solid #EEE"
        borderRight="1px solid #EEE"
      >
        <List spacing={3}>{itemList}</List>
      </AccordionPanel>
    </AccordionItem>
  );
};
export default CourseSyllabusContent;
