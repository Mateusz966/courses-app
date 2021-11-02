import {
  Box,
  Spinner,
  Progress,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { MdChevronRight } from 'react-icons/all';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { history } from '../../../../config/history';
import { CourseForm } from '../../../../components/forms/Course';

const EditCourse: FC = observer(() => {
  const { courseId } = useParams<{ courseId: string }>();
  const methods = useForm({
    mode: 'onChange',
  });
  let didUserCameFromCoursesList = false;

  if (!courseId) {
    return <Spinner />;
  }
  if (
    typeof history.location !== 'undefined' &&
    typeof history.location.state !== 'undefined'
  ) {
    const state = history.location.state as { from: string };
    if (typeof state.from !== 'undefined' && state.from === 'courses list') {
      didUserCameFromCoursesList = true;
    }
  }

  return (
    <Container mt="5" width="100%" maxW="90vw">
      {!didUserCameFromCoursesList ? (
        <Box>
          <Breadcrumb
            pt={{ md: '3', base: '1' }}
            spacing="8px"
            separator={<MdChevronRight color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => history.push('/dashboard')}>
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => history.push('/dashboard/course/creator-zone')}
              >
                Strefa twórcy
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Tworzenie kursu</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Text color="#777" mt="5" fontSize="21px" mb="1">
            Krok 4 z 4
          </Text>
          <Progress colorScheme="teal" size="md" value={100} />
          <Heading
            as="h1"
            size="xl"
            fontSize={{ md: '4xl', base: 'xl' }}
            mt={{ md: '60px', base: '15px' }}
            mb="30px"
            textAlign="center"
          >
            Dodaj informacje o kursie
          </Heading>
        </Box>
      ) : (
        <Heading
          as="h1"
          size="xl"
          fontSize={{ md: '4xl', base: 'xl' }}
          mt={{ md: '60px', base: '15px' }}
          mb="30px"
          textAlign="center"
        >
          Edytuj informacje o kursie
        </Heading>
      )}
      <Box maxW="800px" margin="auto">
        <FormProvider {...methods}>
          <CourseForm />
        </FormProvider>
      </Box>
    </Container>
  );
});

export default EditCourse;
