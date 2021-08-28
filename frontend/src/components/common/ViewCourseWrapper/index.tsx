import { Container, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { ViewCourseHeader } from '../ViewCourseHeader';
import { ViewCourseBody } from '../ViewCourseBody';
import { ViewCourseSidebar } from '../ViewCourseSidebar';

export const ViewCourseWrapper: FC = () => (
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
        <ViewCourseHeader />
        <ViewCourseBody />
      </GridItem>
      <GridItem gridArea="sidebar" display={{ md: 'block', base: 'none' }}>
        <ViewCourseSidebar />
      </GridItem>
    </Grid>
  </Container>
);
