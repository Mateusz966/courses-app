import { Box, Container, Grid, Spinner, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CourseForm } from '../../../components/forms/Course';
import { CreateCourseContent } from '../../../components/forms/Course/CreateContent';

const CourseContent: FC = observer(() => {
  const { courseId } = useParams<{ courseId: string }>();

  return (
      <CreateCourseContent />
  );
});

export default CourseContent;
