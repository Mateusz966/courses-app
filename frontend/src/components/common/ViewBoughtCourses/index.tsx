import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Link,
  Text,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { FC } from 'react';
import { Link as RLink } from 'react-router-dom';
import SadLogo from '../../../assets/sad-logo.png';
import BougthCourseTile from './BougthCourseTile';
import { CourseTableResContent } from '../../../app-types';
import { useViewBoughtCourses } from './useViewBoughtCourses';

const ViewBoughtCourses: FC = () => {
  const { course, inProgress } = useViewBoughtCourses();

  const boughtTiles = course.map((singleCourse: CourseTableResContent) => (
    <BougthCourseTile key={singleCourse.id} course={singleCourse} />
  ));

  const myCourseInfo = () => (
    <GridItem colStart={[1, 2, 2]} colSpan={[1, 1, 3]}>
      <Link as={RLink} to="/dashboard/course/list">
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
              <Image boxSize="150px" src={SadLogo} alt="avatar placeholder" />
            </Center>
          </Box>
          <Box>
            <Center>
              <Text fontSize="1.5rem" m={3} p={6} textAlign="center">
                Nie czekaj tylko sprawdź co możemy ci zaoferować
              </Text>
            </Center>
          </Box>
        </Flex>
      </Link>
    </GridItem>
  );

  if (inProgress) {
    return <Text>Loading ...</Text>;
  }

  return (
    <Container width="100%" maxW="1500px">
      <Grid templateColumns={['repeat(3, 1fr)', null, 'repeat(5, 1fr)']}>
        <GridItem colStart={[1, 1, 2]} colSpan={3} m={6} p={6}>
          <Center>
            {course.length > 0
              ? `Obecnie posiadasz ${course.length} kursów`
              : 'Wygląda na to, że nie kupiłeś żadnych kursów'}
          </Center>
          <Divider m={6} />
        </GridItem>
        {course.length > 0 ? (
          <GridItem colStart={[1, 1, 2]} colSpan={3}>
            <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(3, 1fr)']}>
              {boughtTiles}
            </Grid>
          </GridItem>
        ) : (
          myCourseInfo()
        )}
      </Grid>
    </Container>
  );
};

export default ViewBoughtCourses;
