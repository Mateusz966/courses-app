import { Container } from '@chakra-ui/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CreateCourseContent } from '../../../../components/forms/Course/CreateContent';

const CourseContent: FC = observer(() => (
  <Container>
    <CreateCourseContent />
  </Container>
));

export default CourseContent;
