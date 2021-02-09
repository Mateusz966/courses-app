import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { CategoryDto } from '../../../../app-types/category';
import {
  BaseSelectOption,
  CustomSelectOption,
} from '../../../../app-types/global';
import { courseCategorySchema } from '../../../../formSchemas/courseCategoryForm';
import { useCategories } from '../../../../hooks/useCategories';
import { useCourse } from '../../../../hooks/useCourse';
import { courseStore } from '../../../../stores/course';
import { Button } from '../../../common/Button';
import { FormField } from '../../../common/FormField';
import { FormSelect } from '../../../common/FormField/Select';

export const CourseTopicForm: FC = observer(() => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseCategorySchema),
  });

  const { topics, getTopics } = useCategories();
  const { createCourse } = useCourse();
  const { isValid } = methods.formState;

  useEffect(() => {
    getTopics(
      courseStore.createCourse.category?.value,
      courseStore.createCourse.subcategory?.value
    );
  }, []);

  return (
    <FormProvider {...methods}>
      <Box
        maxW="425px"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit(
          (payload: { topics: BaseSelectOption[] }) => createCourse(payload)
        )}
      >
        <FormField
          labelText="Course subcategory"
          inputName="topic"
          helperText="Course category"
        >
          <FormSelect isMulti options={topics ?? []} />
        </FormField>
        <Button type="submit" isValid={isValid}>
          Next
        </Button>
      </Box>
    </FormProvider>
  );
});
