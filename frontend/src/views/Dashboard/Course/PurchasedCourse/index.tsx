import { Box, Container, Spinner } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PurchasedCourseBody from '../../../../components/common/PurchasedCourseBody';
import { useApi } from '../../../../hooks/useApi';
import { CourseDetailsRes } from '../../../../app-types';

const PurchasedCourse: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { lessonId } = useParams<{ lessonId: string }>();
  const [courseDetails, setCourseDetails] = useState<CourseDetailsRes>();
  const { get, inProgress } = useApi();

  const getCourseDetail = async () => {
    const res = await get<CourseDetailsRes>(`/course/details/${courseId}`);
    if (res) {
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
    <Box>
      <Container maxW="100vw">
        <PurchasedCourseBody
          sections={courseDetails?.section}
          title={courseDetails?.title}
          courseId={courseDetails.id}
          lessonId={lessonId}
        />
      </Container>
    </Box>
  );
};
export default PurchasedCourse;
