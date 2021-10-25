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
import { FC, useEffect, useState } from 'react';
import { Link as RLink } from 'react-router-dom';
import { CourseTableRes, CourseTableResContent } from '../../../app-types';
import { useApi } from '../../../hooks/useApi';
import BougthCourseTile from './BougthCourseTile';
import SadLogo from '../../../assets/sad-logo.png';

const ViewBoughtCourses: FC = () => {
  const { get } = useApi();
  const [course, setCourses] = useState<CourseTableResContent[]>([]);

  const getCourses = async () => {
    const res = await get<CourseTableRes>('/course/bought');
    if (res) {
      setCourses(res.items);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const boughtTiles = course.map((singleCourse) => (
    <BougthCourseTile course={singleCourse} />
  ));

  const myCourseInfo = () => (
    <GridItem colStart={[1, 2, 2]} colSpan={[1, 1, 3]}>
      <Link as={RLink} to="/dashboard/course/list">
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
