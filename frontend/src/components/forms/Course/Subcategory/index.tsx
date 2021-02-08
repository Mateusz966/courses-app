import { Box, HStack, Link } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { CategoryDto } from '../../../../app-types/category';
import { CustomSelectOption } from '../../../../app-types/global';
import { courseCategorySchema } from '../../../../formSchemas/courseCategoryForm';
import { useCategories } from '../../../../hooks/useCategories';
import { useCourse } from '../../../../hooks/useCourse';
import { courseStore } from '../../../../stores/course';
import { Button } from '../../../common/Button';
import { FormField } from '../../../common/FormField';
import { FormSelect } from '../../../common/FormField/Select';

export const CourseSubcategoryForm: FC = observer(() => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseCategorySchema),
  });

  const { subcategories, getSubcategories } = useCategories();
  const { submitSubcategory } = useCourse();
  const { isValid } = methods.formState;

  useEffect(() => {
    // if (courseStore.createCourse?.category?.value)
    //@ts-ignore
    getSubcategories(courseStore.createCourse?.category?.value);
  }, []);

  return (
    <FormProvider {...methods}>
      <Box maxW="425px" margin="auto" as="form">
        <FormField
          labelText="Course subcategory"
          inputName="subcategory"
          helperText="Course category"
        >
          <FormSelect options={subcategories ?? []} />
        </FormField>
        <HStack>
          <Link as={NavLink} to="/dashboard/course/add/category">
            Back
          </Link>
          <Button type="button" isValid={isValid}>
            Next
          </Button>
        </HStack>
      </Box>
    </FormProvider>
  );
});
