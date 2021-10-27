import {
  Box,
  Progress,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Text,
} from '@chakra-ui/react';
import { MdChevronRight } from 'react-icons/all';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { history } from '../../../../config/history';
import { CategoryDto, CustomSelectOption } from '../../../../app-types';
import { courseCategorySchema } from '../../../../formSchemas/courseCategoryForm';
import { useCategories } from '../../../../hooks/useCategories';
import { useCourse } from '../../../../hooks/course/useCourse';
import { courseStore } from '../../../../stores/course';
import { Button } from '../../../common/Button';
import { FormField } from '../../../common/FormField';
import { FormSelect } from '../../../common/FormField/Select';

export const CourseCategoryForm: FC = observer(() => {
  const { courseId } = useParams<{ courseId?: string }>();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseCategorySchema),
  });

  const { categories, getCategories } = useCategories();
  const { submitCategory } = useCourse();
  const { isValid } = methods.formState;

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (courseId) {
      courseStore.setSubcategory(null);
      courseStore.setTopic(null);
    }
  }, [courseId]);

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
          Krok 1 z 4
        </Text>
        <Progress colorScheme="teal" size="md" value={25} />
        <Heading
          as="h1"
          size="xl"
          fontSize={{ md: '4xl', base: 'xl' }}
          mt={{ md: '60px', base: '15px' }}
          mb="30px"
          textAlign="center"
        >
          Wybierz kategorię kursu
        </Heading>
        <Box
          maxW="425px"
          margin="auto"
          as="form"
          onSubmit={methods.handleSubmit(
            (payload: { category: CustomSelectOption<CategoryDto> }) =>
              submitCategory(payload, courseId),
          )}
        >
          <FormField
            labelText="Course category"
            name="category"
            helperText="Chose category"
          >
            <FormSelect
              defaultValue={courseStore.courseCategoryDetails.category}
              options={categories ?? []}
            />
          </FormField>
          <Button mt="7" dataCy="nextButton" type="submit" disabled={!isValid}>
            Next
          </Button>
        </Box>
      </FormProvider>
    </Container>
  );
});
