import { Stack, Text, Icon } from '@chakra-ui/react';
import { BsFillStarFill, BsStarHalf } from 'react-icons/bs';
import { FC } from 'react';

export const CourseRating: FC = () => (
  <Stack
    spacing={1}
    mt="1"
    mb={{ md: '0', base: '2' }}
    direction="row"
    alignItems="center"
    color="yellow.400"
  >
    <Text>4,5</Text>
    <Icon w="3" h="3" as={BsFillStarFill} />
    <Icon w="3" h="3" as={BsFillStarFill} />
    <Icon w="3" h="3" as={BsFillStarFill} />
    <Icon w="3" h="3" as={BsFillStarFill} />
    <Icon w="3" h="3" as={BsStarHalf} />
  </Stack>
);
