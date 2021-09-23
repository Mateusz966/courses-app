import { FC } from 'react';
import { ListItem, ListIcon, Text, HStack } from '@chakra-ui/react';
import { MdVideoLibrary } from 'react-icons/md';

interface Props {
  id: string;
  title: string;
  description: string;
}
const SyllabusLesson: FC<Props> = ({ id, title, description }) => (
  <ListItem key={id}>
    <HStack w="100%" justifyContent="flex-end">
      <ListIcon as={MdVideoLibrary} />
      <Text mr="auto">{title}</Text>
      <Text fontWeight="600" ml="auto">
        {description}
      </Text>
    </HStack>
  </ListItem>
);
export default SyllabusLesson;
