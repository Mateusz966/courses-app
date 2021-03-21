import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useParams } from 'react-router-dom';
import { FC, useEffect } from 'react';
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

export const CourseForm:FC = observer(() => {
  const { courseId } = useParams<{ courseId: string }>();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseSchema),
  });
  const DEBOUNCE_TIMEOUT = 3500;
  const { inProgress, updateCourse, handleEditorChange, publish } = useCourse();
  const {
    getValues,
    watch,
    reset,
    formState: { isValid },
  } = methods;
  const title = watch('title');
  const description = watch('description');

  const contentDebounce = useDebounce(
    courseStore.courseContent,
    DEBOUNCE_TIMEOUT
  );
  const titleDebounce = useDebounce(title, DEBOUNCE_TIMEOUT);
  const descriptionDebounce = useDebounce(description, DEBOUNCE_TIMEOUT);

  useEffect(() => {
    if (courseId) {
      courseStore.getCourseDetails(courseId);
    }
  }, [courseId]);

  useEffect(() => {
    if (courseStore.course) {
      reset(courseStore.course);
    }
  }, [reset]);

  useEffect(() => {
    updateCourse(
      getValues(),
      courseStore.courseContent,
      methods.setError,
      courseId
    );
  }, [
    contentDebounce,
    titleDebounce,
    descriptionDebounce,
    courseId,
    getValues,
    methods.setError,
    updateCourse,
  ]);

  return (
    <FormProvider {...methods}>
      <Box
        maxW="425px"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit(() => publish(courseId))}
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
        <Link to={`/dashboard/course/edit/details/${courseId}/category`}>
          Kategorie
        </Link>
        <Button type="submit" isValid={isValid} inProgress={inProgress}>
          Opublikuj kurs
        </Button>
      </Box>
    </FormProvider>
  );
});