import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { courseCategorySchema } from '../../../../formSchemas/courseCategoryForm';
import { useCategories } from '../../../../hooks/useCategories';
import { useCourse } from '../../../../hooks/useCourse';
import { courseStore } from '../../../../stores/course';
import { Button } from '../../../common/Button';
import { FormField } from '../../../common/FormField';
import { FormSelect } from '../../../common/FormField/Select';

interface Props {
  courseId?: string;
}

export const CourseCategoryForm: FC<Props> = observer(({ courseId }) => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseCategorySchema),
  });

  const { categories, getCategories } = useCategories();
  const { submitCategory } = useCourse();
  const { isValid } = methods.formState;

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <FormProvider {...methods}>
      <Box
        maxW="425px"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit(submitCategory)}
      >
        <FormField
          labelText="Course category"
          inputName="category"
          helperText="Chose category"
        >
          <FormSelect
            defaultValue={courseStore.createCourse.category}
            options={categories ?? []}
          />
        </FormField>
        <Button type="submit" isValid={isValid}>
          Next
        </Button>
      </Box>
    </FormProvider>
  );
});
