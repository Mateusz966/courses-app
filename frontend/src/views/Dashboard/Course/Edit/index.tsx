import {
  Box,
  Container,
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { MdChevronRight } from 'react-icons/all';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CourseForm } from '../../../../components/forms/Course';

const EditCourse: FC = observer(() => {
  const { courseId } = useParams<{ courseId: string }>();
  const methods = useForm({
    mode: 'onChange',
  });

  if (!courseId) {
    return <Spinner />;
  }

  return (
    <FormProvider {...methods}>
      <Container mt="5" width="100%" maxW="1500px">
        <Breadcrumb
          pt={{ md: '3', base: '1' }}
          spacing="8px"
          separator={<MdChevronRight color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/course/manage">
              Moje kursy
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Edycja kursu</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Container>
      <Box as="section">
        <Container mt="5" width="100%" maxW="800px">
          <CourseForm />
        </Container>
      </Box>
    </FormProvider>
  );
});

export default EditCourse;
