import { Box, HStack, Link } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { courseSubcategorySchema } from '../../../../formSchemas/courseCategoryForm';
import { useCategories } from '../../../../hooks/useCategories';
import { useCourse } from '../../../../hooks/useCourse';
import { courseStore } from '../../../../stores/course';
import { Button } from '../../../common/Button';
import { FormField } from '../../../common/FormField';
import { FormSelect } from '../../../common/FormField/Select';

export const CourseSubcategoryForm: FC = observer(() => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseSubcategorySchema),
  });

  const { subcategories, getSubcategories } = useCategories();
  const { submitSubcategory } = useCourse();
  const { isValid } = methods.formState;

  useEffect(() => {
    getSubcategories(courseStore.createCourse?.category?.value);
  }, []);

  return (
    <FormProvider {...methods}>
      <Box
        maxW="425px"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit(submitSubcategory)}
      >
        <FormField
          labelText="Course subcategory"
          inputName="subcategory"
          helperText="Chose subcategory"
        >
          <FormSelect
            defaultValue={courseStore.createCourse.subcategory}
            options={subcategories ?? []}
          />
        </FormField>
        <HStack>
          <Link as={NavLink} to="/dashboard/course/add/category">
            Back
          </Link>
          <Button type="submit" isValid={isValid}>
            Next
          </Button>
        </HStack>
      </Box>
    </FormProvider>
  );
});
