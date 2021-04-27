import { Box, HStack, Link } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link as RLink, useParams } from 'react-router-dom';
import { CategoryDto } from '../../../../app-types/category';
import { CustomSelectOption } from '../../../../app-types/global';
import { courseSubcategorySchema } from '../../../../formSchemas/courseCategoryForm';
import { useCategories } from '../../../../hooks/useCategories';
import { useCourse } from '../../../../hooks/useCourse';
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

  const backLink = useCallback(() => {
    const url = courseId
      ? `/dashboard/course/edit/details/${courseId}/category`
      : '/dashboard/course/add/category';
    return url;
  }, [courseId]);

  useEffect(() => {
    getSubcategories(courseStore.courseCategoryDetails?.category?.value?.id);
  }, [getSubcategories]);

  return (
    <FormProvider {...methods}>
      <Box
        maxW="425px"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit(
          (payload: { subcategory: CustomSelectOption<CategoryDto> }) =>
            submitSubcategory(payload, courseId)
        )}
      >
        <FormField
          labelText="Course subcategory"
          inputName="subcategory"
          helperText="Chose subcategory"
        >
          <FormSelect
            defaultValue={courseStore.courseCategoryDetails.subcategory}
            options={subcategories ?? []}
          />
        </FormField>
        <HStack>
          <Link as={RLink} to={backLink()}>
            Back
          </Link>
          <Button dataCy="nextButton" type="submit" disabled={!isValid}>
            Next
          </Button>
        </HStack>
      </Box>
    </FormProvider>
  );
});
