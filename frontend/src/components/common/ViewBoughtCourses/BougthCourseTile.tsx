import { Image } from '@chakra-ui/image';
import { Box, Center, Flex, GridItem, Text } from '@chakra-ui/layout';
import { FC } from 'react';
import { CourseTableResContent } from '../../../app-types';
import { apiUrl } from '../../../config/apiUrl';

interface Props {
  course: CourseTableResContent;
}

const BougthCourseTile: FC<Props> = ({ course: { title, id } }) => (
  <GridItem m={6} p={6} key={id}>
    <Flex
      pos="relative"
      flexDirection="column"
      justifyContent="space-around"
      rounded="lg"
      boxShadow="xl"
      h="100%"
      w="100%"
      top="0"
      right="0"
      transition="all 500ms ease"
      _hover={{
        pos: 'relative',
        top: '5%',
        right: '5%',
        h: '110%',
        w: '110%',
        boxShadow: '2xl',
      }}
    >
      <Box>
        <Center>
          <Image
            boxSize="150px"
            src={`${apiUrl}/course/main-photo/${id}`}
            alt="avatar placeholder"
          />
        </Center>
      </Box>
      <Box>
        <Center>
          <Text fontSize="1.5rem" m={3} p={6} textAlign="center">
            {title}
          </Text>
        </Center>
      </Box>
    </Flex>
  </GridItem>
);

export default BougthCourseTile;