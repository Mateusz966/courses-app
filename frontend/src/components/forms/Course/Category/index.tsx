import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
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
    <FormProvider {...methods}>
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
        <Button dataCy="nextButton" type="submit" disabled={!isValid}>
          Next
        </Button>
      </Box>
    </FormProvider>
  );
});
