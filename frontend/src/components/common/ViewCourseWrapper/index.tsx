import { Container, Grid, GridItem, Spinner } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ViewCourseHeader } from '../ViewCourseHeader';
import { ViewCourseBody } from '../ViewCourseBody';
import { ViewCourseSidebar } from '../ViewCourseSidebar';
import { useApi } from '../../../hooks/useApi';
import { CourseDetailsRes } from '../../../app-types';

export const ViewCourseWrapper: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseDetails, setCourseDetails] = useState<CourseDetailsRes>();
  const { get, inProgress } = useApi();

  const getCourseDetail = async () => {
    const res = await get<CourseDetailsRes>(`/course/details/${courseId}`);
    if (res) {
      console.log(res);
      setCourseDetails(res);
    }
  };

  useEffect(() => {
    getCourseDetail();
  }, []);

  if (inProgress) {
    return <Spinner />;
  }
  if (!courseDetails) {
    return <Spinner />; // info o brak kursu
  }

  return (
    <Container width="100%" maxW="1500px">
      <Grid
        gridTemplateColumns={{
          sm: '3fr 1fr',
          base: '1fr',
        }}
        display={{
          md: 'grid',
          base: 'block',
        }}
        gridTemplateAreas="'mainArea sidebar'"
        gridColumnGap={{ lg: '10', md: '4' }}
        ml="auto"
        mr="auto"
      >
        <GridItem gridArea="mainArea">
          <ViewCourseHeader courseDetails={courseDetails} />
          <ViewCourseBody
            content={courseDetails?.content}
            sections={courseDetails?.section}
          />
        </GridItem>
        <GridItem gridArea="sidebar" display={{ md: 'block', base: 'none' }}>
          <ViewCourseSidebar photoId={courseDetails?.id} />
        </GridItem>
      </Grid>
    </Container>
  );
};
