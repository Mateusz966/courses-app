import {
  Box,
  Grid,
  GridItem,
  Link,
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
import { courseSubcategorySchema } from '../../../../formSchemas/courseCategoryForm';
import { useCategories } from '../../../../hooks/useCategories';
import { useCourse } from '../../../../hooks/course/useCourse';
import { courseStore } from '../../../../stores/course';
import { Button } from '../../../common/Button';
import { FormField } from '../../../common/FormField';
import { FormSelect } from '../../../common/FormField/Select';

export const CourseSubcategoryForm: FC = observer(() => {
  const { courseId } = useParams<{ courseId?: string }>();

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseSubcategorySchema),
  });

  const { subcategories, getSubcategories } = useCategories();
  const { submitSubcategory } = useCourse();
  const { isValid } = methods.formState;

  const backLink = useCallback(
    () =>
      courseId
        ? `/dashboard/course/edit/details/${courseId}/category`
        : '/dashboard/course/add/category',
    [courseId],
  );

  useEffect(() => {
    getSubcategories(courseStore.courseCategoryDetails?.category?.value?.id);
  }, [getSubcategories]);

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
          Krok 2 z 4
        </Text>
        <Progress colorScheme="teal" size="md" value={50} />
        <Heading
          as="h1"
          size="xl"
          fontSize={{ md: '4xl', base: 'xl' }}
          mt={{ md: '60px', base: '15px' }}
          mb="30px"
          textAlign="center"
        >
          Wybierz podkategorię kursu
        </Heading>
        <Box
          maxW="425px"
          margin="auto"
          as="form"
          onSubmit={methods.handleSubmit(
            (payload: { subcategory: CustomSelectOption<CategoryDto> }) =>
              submitSubcategory(payload, courseId),
          )}
        >
          <FormField
            labelText="Course subcategory"
            name="subcategory"
            helperText="Chose subcategory"
          >
            <FormSelect
              defaultValue={courseStore.courseCategoryDetails.subcategory}
              options={subcategories ?? []}
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
                dataCy="nextButton"
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
