import { Container } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CreateCourseContent } from '../../../../components/forms/Course/CreateContent';

const CourseContent: FC = observer(() => {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <Container>
      <CreateCourseContent />
    </Container>
  );
});

export default CourseContent;
