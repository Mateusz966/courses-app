import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useParams } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { Editor } from '@tinymce/tinymce-react';
import { FormField } from '../../common/FormField';
import { Input } from '../../common/FormField/Input';
import { Button } from '../../common/Button';
import { courseStore } from '../../../stores/course';
import { courseSchema } from '../../../formSchemas/course';
import { useCourse } from '../../../hooks/useCourse';
import ImagePicker from '../../common/FormField/File';
import { useDebounce } from '../../../hooks/useDebounce';

export const CourseForm: FC = observer(() => {
  const { courseId } = useParams<{ courseId: string }>();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseSchema),
  });
  const DEBOUNCE_TIMEOUT = 3500;
  const {
    getValues,
    watch,
    reset,
    setError,
    formState: { isValid },
  } = methods;
  const { inProgress, updateCourse, handleEditorChange, publish } = useCourse({
    setError,
  });

  const title = watch('title');
  const description = watch('description');

  const contentDebounce = useDebounce(
    courseStore.courseContent,
    DEBOUNCE_TIMEOUT,
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
      reset({
        title: courseStore.course.title,
        description: courseStore.course.description,
      });
    }
  }, [reset]);

  useEffect(() => {
    updateCourse(getValues(), courseStore.courseContent, courseId);
  }, [
    contentDebounce,
    titleDebounce,
    descriptionDebounce,
    courseId,
    getValues,
    updateCourse,
  ]);

  return (
    <FormProvider {...methods}>
      <Box
        maxW="100%"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit(() => publish(courseId))}
      >
        <FormField labelText="Course photo" name="courseFn">
          <ImagePicker
            desktopRatio={22 / 9}
            previewUrl={courseId && `course/image/courseFn/${courseId}`}
          />
        </FormField>
        <FormField labelText="Title" name="title">
          <Input isRequired type="text" placeholder="NodeJS Course" />
        </FormField>
        <FormField labelText="Description" name="description">
          <Input isRequired type="text" placeholder="Course about...." />
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
              // eslint-disable-next-line no-multi-str
              'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
          }}
          onEditorChange={handleEditorChange}
        />
        <Link to={`/dashboard/course/edit/content/${courseId}`}>
          Edytuj zawartość kursu
        </Link>
        <Link to={`/dashboard/course/edit/details/${courseId}/category`}>
          Kategorie
        </Link>
        <Button type="submit" disabled={!isValid} inProgress={inProgress}>
          Opublikuj kurs
        </Button>
      </Box>
    </FormProvider>
  );
});
