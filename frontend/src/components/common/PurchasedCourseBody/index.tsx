import {
  Box,
  Text,
  AspectRatio,
  Grid,
  GridItem,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/useApi';
import PurchasedCourseSidebar from '../PurchasedCourseSidebar';
import { Section, LessonDetailsRes } from '../../../app-types';

interface Props {
  sections: Section[];
  title: string;
  lessonId: string;
  courseId: string;
}
export const PurchasedCourse: React.FC<Props> = ({
  sections,
  title,
  lessonId,
  courseId,
}) => {
  const [lessonDetails, setLessonDetails] = useState<LessonDetailsRes>();
  const { get, inProgress } = useApi();
  if (lessonId !== '' && lessonId !== undefined) {
    const getLessonDetails = async () => {
      const resLesson = await get<LessonDetailsRes>(
        `course/lesson/${lessonId}`,
      );
      if (resLesson) {
        setLessonDetails(resLesson);
      }
    };
    useEffect(() => {
      getLessonDetails();
    }, []);
    if (inProgress) {
      return <Spinner />;
    }
  } else {
    return <Spinner />;
  }
  return (
    <Box>
      <Grid
        gridTemplateColumns={{ base: '1fr', lg: '3fr 1fr' }}
        gridColumnGap="1"
        mt="5"
        pb="50px"
      >
        <GridItem>
          <AspectRatio maxW="100vw" maxH="90vh" ratio={16 / 9}>
            <iframe
              title="lessonVideo"
              src={`https://player.vimeo.com/video/${lessonDetails?.videoFn}`}
              allowFullScreen
            />
          </AspectRatio>
          <Heading fontSize="24px" mt="20px" mb="20px">
            {lessonDetails?.title}
          </Heading>
          <Text>{lessonDetails?.description}</Text>
        </GridItem>
        <GridItem pl="5">
          <PurchasedCourseSidebar
            sections={sections}
            title={title}
            courseId={courseId}
            lessonId={lessonId}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
export default PurchasedCourse;
