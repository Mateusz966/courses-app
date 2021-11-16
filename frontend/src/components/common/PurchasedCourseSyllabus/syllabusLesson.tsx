import { FC } from 'react';
import { ListItem, ListIcon, Text, HStack } from '@chakra-ui/react';
import { MdVideoLibrary } from 'react-icons/md';
import { history } from '../../../config/history';

interface Props {
  id: string;
  title: string;
  courseId: string;
}
const SyllabusLesson: FC<Props> = ({ id, title, courseId }) => (
  <ListItem key={id}>
    <HStack
      w="100%"
      onClick={() =>
        history.push(`/dashboard/course/bought/view/${courseId}/${id}`)
      }
      cursor="pointer"
    >
      <ListIcon as={MdVideoLibrary} />
      <Text mr="auto">{title}</Text>
    </HStack>
  </ListItem>
);
export default SyllabusLesson;
