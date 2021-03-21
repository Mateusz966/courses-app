import { Box, HStack, Link } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link as RLink } from 'react-router-dom';
import { CategoryDto } from '../../../../app-types/category';
import {
  CustomSelectOption,
} from '../../../../app-types/global';
import { courseTopicsSchema } from '../../../../formSchemas/courseCategoryForm';
import { useCategories } from '../../../../hooks/useCategories';
import { useCourse } from '../../../../hooks/useCourse';
import { courseStore } from '../../../../stores/course';
import { Button } from '../../../common/Button';
import { FormField } from '../../../common/FormField';
import { FormSelect } from '../../../common/FormField/Select';

interface Props {
  courseId?: string;
}

export const CourseTopicForm: FC<Props> = observer(({ courseId }) => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseTopicsSchema),
  });

  const { topics, getTopics } = useCategories();
  const { createCourse } = useCourse();
  const { isValid } = methods.formState;

  const backLink = useCallback(() => {
    const url = courseId
      ? `/dashboard/course/edit/details/${courseId}/subcategory`
      : '/dashboard/course/add/subcategory';
    return url;
  }, [courseId]);

  useEffect(() => {
    getTopics(
      courseStore.courseCategoryDetails.category?.value?.id,
      courseStore.courseCategoryDetails.subcategory?.value?.id
    );
  }, [getTopics]);

  return (
    <FormProvider {...methods}>
      <Box
        maxW="425px"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit(
          (payload: { topics: CustomSelectOption<CategoryDto>[] }) =>
            createCourse(payload, courseId)
        )}
      >
        <FormField
          labelText="Course topics"
          inputName="topics"
          helperText="Chose course topics"
        >
          <FormSelect isMulti options={topics ?? []} />
        </FormField>
        <HStack>
          <Link as={RLink} to={backLink()}>
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
