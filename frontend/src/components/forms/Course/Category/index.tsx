import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { CategoryDto } from '../../../../app-types/category';
import { CustomSelectOption } from '../../../../app-types/global';
import { courseCategorySchema } from '../../../../formSchemas/courseCategoryForm';
import { useCategories } from '../../../../hooks/useCategories';
import { useCourse } from '../../../../hooks/useCourse';
import { Button } from '../../../common/Button';
import { FormField } from '../../../common/FormField';
import { FormSelect } from '../../../common/FormField/Select';

export const CourseCategoryForm: FC = observer(() => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseCategorySchema),
  });

  const { categories } = useCategories();
  const { submitCategory } = useCourse();
  const { isValid } = methods.formState;

  return (
    <FormProvider {...methods}>
      <Box
        maxW="425px"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit(
          (payload: CustomSelectOption<CategoryDto>) => submitCategory(payload)
        )}
      >
        <FormField
          labelText="Course category"
          inputName="category"
          helperText="Course category"
        >
          <FormSelect options={categories ?? []} />
        </FormField>
        <Button type="submit" isValid={isValid}>
          Next
        </Button>
      </Box>
    </FormProvider>
  );
});
