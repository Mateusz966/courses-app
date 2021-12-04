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
  lessonId?: string;
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
  console.log(lessonId);
  let lessonTitle = sections[0].lesson[0].title;
  let lessonDescription = sections[0].lesson[0].description;
  let lessonVideoFn = sections[0].lesson[0].videoFn;
  let currentLessonId = sections[0].lesson[0].id;
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
  } else if (sections[0] !== undefined) {
    lessonTitle = sections[0].lesson[0].title;
    lessonDescription = sections[0].lesson[0].description;
    lessonVideoFn = sections[0].lesson[0].videoFn;
    currentLessonId = sections[0].lesson[0].id;
    if (currentLessonId === '' || currentLessonId === undefined) {
      return <Spinner />;
    }
  }
  if (lessonDetails !== undefined) {
    lessonTitle = lessonDetails?.title;
    lessonDescription = lessonDetails?.description;
    lessonVideoFn = lessonDetails?.videoFn;
    currentLessonId = lessonId as string;
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
              src={`https://player.vimeo.com/video/${lessonVideoFn}`}
              allowFullScreen
            />
          </AspectRatio>
          <Heading fontSize="24px" mt="20px" mb="20px">
            {lessonTitle}
          </Heading>
          <Text>{lessonDescription}</Text>
        </GridItem>
        <GridItem pl="5">
          <PurchasedCourseSidebar
            sections={sections}
            title={title}
            courseId={courseId}
            lessonId={currentLessonId}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
export default PurchasedCourse;
