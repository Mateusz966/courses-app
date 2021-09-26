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
}
const courseSyllabusContent: FC<Props> = ({
  sections: { id, title, description, lesson },
}) => {
  const itemList = lesson.map(
    (singleLesson: { id: string; title: string; description: string }) => (
      <SyllabusLesson id={id} title={title} description={description} />
    ),
  );

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
            {title}
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
export default courseSyllabusContent;
