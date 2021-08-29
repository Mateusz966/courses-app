import { Container, Grid, GridItem } from '@chakra-ui/react';
import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { CreateCourseContent } from '../../../../components/forms/Course/CreateContent';
import { SectionList } from '../../../../components/common/SectionList';

const CourseContent: FC = observer(() => (
  <Container>
    <Grid gridTemplateColumns="30% 1fr">
      <GridItem>
        <SectionList />
      </GridItem>
      <GridItem>
        <CreateCourseContent />
      </GridItem>
    </Grid>
  </Container>
));

export default CourseContent;
