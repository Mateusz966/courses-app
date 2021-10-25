import {
  Container,
  Grid,
  GridItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdChevronRight } from 'react-icons/all';
import { observer } from 'mobx-react-lite';
import { history } from '../../../../config/history';
import { CreateCourseContent } from '../../../../components/forms/Course/CreateContent';
import { SectionList } from '../../../../components/common/SectionList';
import { courseStore } from '../../../../stores/course';

const CourseContent: FC = observer(() => {
  const { courseId } = useParams<{ courseId: string }>();

  useEffect(() => {
    if (courseId) {
      courseStore.getCourseDetails(courseId);
    }
  }, [courseId]);

  return (
    <Container mt="5" width="100%" maxW="1500px">
      <Breadcrumb
        pt={{ md: '3', base: '1' }}
        spacing="8px"
        separator={<MdChevronRight color="gray.500" />}
      >
        <BreadcrumbItem d={{ md: 'inline-flex', base: 'none' }}>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem d={{ md: 'inline-flex', base: 'none' }}>
          <BreadcrumbLink href="/dashboard/course/manage">
            Moje kursy
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink
            onClick={() => history.push(`/dashboard/course/edit/${courseId}`)}
          >
            Edycja kursu
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Grid
        gridTemplateColumns="30% 1fr"
        gridColumnGap={{ lg: '10', md: '4' }}
        mt="5"
      >
        <GridItem>
          <SectionList />
        </GridItem>
        <GridItem>
          <CreateCourseContent />
        </GridItem>
      </Grid>
    </Container>
  );
});

export default CourseContent;
