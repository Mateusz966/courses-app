import { FC } from 'react';
import { ListItem, ListIcon, Text, HStack } from '@chakra-ui/react';
import { MdVideoLibrary } from 'react-icons/md';
import { history } from '../../../config/history';

interface Props {
  id: string;
  title: string;
  courseId: string;
  lessonId: string;
}
const SyllabusLesson: FC<Props> = ({ id, title, courseId, lessonId }) => {
  let lessonTitle: any;
  if (lessonId === id) {
    lessonTitle = (
      <Text color="teal.500" mr="auto">
        {title}
      </Text>
    );
  } else {
    lessonTitle = <Text mr="auto">{title}</Text>;
  }
  return (
    <ListItem key={id}>
      <HStack
        w="100%"
        onClick={() =>
          history.push(`/dashboard/course/bought/view/${courseId}/${id}`)
        }
        cursor="pointer"
        _hover={{
          color: 'teal.400',
        }}
      >
        <ListIcon as={MdVideoLibrary} />
        {lessonTitle}
      </HStack>
    </ListItem>
  );
};
export default SyllabusLesson;
