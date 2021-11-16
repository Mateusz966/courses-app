import { Image } from '@chakra-ui/image';
import { Box, Center, Flex, GridItem, Text } from '@chakra-ui/layout';
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
      flexDirection="column"
      justifyContent="space-around"
      rounded="lg"
      boxShadow="xl"
      _hover={{
        pos: 'relative',
        top: '5%',
        right: '5%',
        h: '110%',
        w: '110%',
        boxShadow: '2xl',
      }}
      onClick={() =>
        history.push(
          `/dashboard/course/bought/view/${id}/377868e8-706d-4e37-ac73-33024e3609ed`,
        )
      }
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
