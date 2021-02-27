import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import React, { FC, useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormField } from '../../common/FormField';
import { Input } from '../../common/FormField/Input';
import { Editor } from '@tinymce/tinymce-react';
import { observer } from 'mobx-react-lite';
import { Button } from '../../common/Button';
import { courseStore } from '../../../stores/course';
import { courseSchema } from '../../../formSchemas/course';
import { useCourse } from '../../../hooks/useCourse';
import { useDebounce } from '../../../hooks/useDebounce';

export const CourseForm: FC = observer(() => {
  const { courseId } = useParams<{ courseId: string }>();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseSchema),
  });
  const handleEditorChange = useCallback(
    (content, editor) => {
      courseStore.setContent(content);
    },
    [courseStore.courseContent]
  );
  const { inProgress, updateCourse } = useCourse();

  const { isValid } = methods.formState;
  const { getValues, watch, reset } = methods;
  const title = watch('title');
  const description = watch('description');

  const contentDebounce = useDebounce(courseStore.courseContent, 3500);
  const titleDebounce = useDebounce(title, 3500);
  const descriptionDebounce = useDebounce(description, 3500);

  useEffect(() => {
    if (courseId) {
      courseStore.getCourseDetails(courseId);
    }
  }, [courseId]);

  useEffect(() => {
    if (courseStore.course) {
      reset(courseStore.course);
    }
  }, [courseStore.course]);

  useEffect(() => {
    updateCourse(
      getValues(),
      courseStore.courseContent,
      methods.setError,
      courseId
    );
  }, [contentDebounce, titleDebounce, descriptionDebounce]);

  return (
    <FormProvider {...methods}>
      <Box
        maxW="425px"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit((data: any) =>
          updateCourse(data, methods.setError, courseId)
        )}
      >
        <FormField labelText="Title" inputName="title">
          <Input type="text" placeholder="NodeJS Course" />
        </FormField>
        <FormField labelText="Description" inputName="description">
          <Input type="text" placeholder="Course about...." />
        </FormField>
        <Editor
          apiKey="f77pjcz1vwa1mi1almj8uhwj2crs196lq21stcyj2dq0w8pf"
          initialValue={courseStore?.courseContent}
          init={{
            height: 400,
            plugins: [
              'advlist autolink lists link preview anchor',
              'searchreplace',
              'paste code help',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
          }}
          onEditorChange={handleEditorChange}
        />
        <Button type="submit" isValid={isValid} inProgress={inProgress}>
          Opublikuj kurs
        </Button>
      </Box>
    </FormProvider>
  );
});
