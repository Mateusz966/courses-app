import { Image } from '@chakra-ui/image';
import { Box, Center, Flex, GridItem, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import { CourseTableResContent } from '../../../app-types';
import { apiUrl } from '../../../config/apiUrl';
import { history } from '../../../config/history';

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
      boxShadow="lg"
      h="100%"
      w="100%"
      top="0"
      right="0"
      transition="all 250ms"
      _hover={{
        boxShadow: 'xl',
        cursor: 'pointer',
      }}
      onClick={() => history.push(`/dashboard/course/bought/view/${id}`)}
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
        <Text fontSize="1.2rem" m={3} p={6} mb="0" textAlign="center">
          {title}
        </Text>
        <Center>
          <Button colorScheme="teal" mb="25px">
            Oglądaj
          </Button>
        </Center>
      </Box>
    </Flex>
  </GridItem>
);

export default BougthCourseTile;
