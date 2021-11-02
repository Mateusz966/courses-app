import {
  Box,
  Link,
  Grid,
  GridItem,
  Progress,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect } from 'react';
import { MdChevronRight } from 'react-icons/all';
import { FormProvider, useForm } from 'react-hook-form';
import { Link as RLink, useParams } from 'react-router-dom';
import { history } from '../../../../config/history';
import { CategoryDto } from '../../../../app-types/category';
import { CustomSelectOption } from '../../../../app-types/global';
import { courseTopicsSchema } from '../../../../formSchemas/courseCategoryForm';
import { useCategories } from '../../../../hooks/useCategories';
import { useCourse } from '../../../../hooks/course/useCourse';
import { courseStore } from '../../../../stores/course';
import { Button } from '../../../common/Button';
import { FormField } from '../../../common/FormField';
import { FormSelect } from '../../../common/FormField/Select';

export const CourseTopicForm: FC = observer(() => {
  const { courseId } = useParams<{ courseId?: string }>();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseTopicsSchema),
  });

  const { topics, getTopics } = useCategories();
  const { handleCourseDetailsSubmit, inProgress } = useCourse();
  const { isValid } = methods.formState;

  const backLink = useCallback(
    () =>
      courseId
        ? `/dashboard/course/edit/details/${courseId}/subcategory`
        : '/dashboard/course/add/subcategory',
    [courseId],
  );

  useEffect(() => {
    if (
      courseStore.courseCategoryDetails.category?.value?.id &&
      courseStore.courseCategoryDetails.subcategory?.value?.id
    ) {
      getTopics(
        courseStore.courseCategoryDetails.category?.value?.id,
        courseStore.courseCategoryDetails.subcategory?.value?.id,
      );
    }
  }, [getTopics]);

  return (
    <Container mt="5" width="100%" maxW="90vw">
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
      <FormProvider {...methods}>
        <Text color="#777" mt="5" fontSize="21px" mb="1">
          Krok 3 z 4
        </Text>
        <Progress colorScheme="teal" size="md" value={75} />
        <Heading
          as="h1"
          size="xl"
          fontSize={{ md: '4xl', base: 'xl' }}
          mt={{ md: '60px', base: '15px' }}
          mb="30px"
          textAlign="center"
        >
          Wybierz tematy, które będą w kursie
        </Heading>
        <Box
          maxW="425px"
          margin="auto"
          as="form"
          onSubmit={methods.handleSubmit(
            (payload: { topics: CustomSelectOption<CategoryDto>[] }) =>
              handleCourseDetailsSubmit(payload, courseId),
          )}
        >
          <FormField
            labelText="Course topics"
            name="topics"
            helperText="Chose course topics"
          >
            <FormSelect
              isMulti
              defaultValue={courseStore.courseCategoryDetails.topics}
              options={topics ?? []}
            />
          </FormField>
          <Grid
            gridTemplateRows="1fr"
            gridTemplateColumns="1fr 2fr"
            gridColumnGap="3"
            mt="10"
            textAlign="center"
          >
            <GridItem>
              <Link
                height="10"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                as={RLink}
                to={backLink()}
              >
                Back
              </Link>
            </GridItem>
            <GridItem>
              <Button
                mt="0"
                inProgress={inProgress}
                type="submit"
                disabled={!isValid}
              >
                Next
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </FormProvider>
    </Container>
  );
});
