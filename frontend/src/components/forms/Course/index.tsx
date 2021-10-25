import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useParams } from 'react-router-dom';
import { FC, useCallback, useEffect } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { Editor } from '@tinymce/tinymce-react';
import debounce from 'lodash/debounce';
import { FormField } from '../../common/FormField';
import { Input } from '../../common/FormField/Input';
import { Button } from '../../common/Button';
import { courseStore } from '../../../stores/course';
import { courseSchema } from '../../../formSchemas/course';
import { useCourse } from '../../../hooks/course/useCourse';
import ImagePicker from '../../common/FormField/File';
import { useRootStore } from '../../../stores/storeContext';

export const CourseForm: FC = observer(() => {
  const { courseId } = useParams<{ courseId: string }>();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(courseSchema),
  });

  const {
    fileStore: { files },
  } = useRootStore();

  const {
    reset,
    setError,
    getValues,
    formState: { isValid },
    control,
  } = methods;
  const { inProgress, publish, handleUpdateCourse } = useCourse({
    setError,
    getValues,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const watchedContent = methods.watch('content');

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
        content: courseStore.courseContent,
        price: courseStore.course.price,
      });
    }
  }, [reset, courseStore.course]);

  const debouncedSave = useCallback(
    debounce(() => handleUpdateCourse(courseId), 1000),
    [], // will be created only once initially
  );

  const handleFormChange = () => {
    debouncedSave();
  };

  useEffect(() => {
    handleFormChange();
  }, [watchedContent, files]);

  return (
    <FormProvider {...methods}>
      <form
        onChange={handleFormChange}
        onSubmit={methods.handleSubmit(() => publish(courseId))}
      >
        <FormField labelText="Course photo" name="courseFn">
          <ImagePicker
            desktopRatio={22 / 9}
            previewUrl={
              courseStore?.course?.courseFn &&
              courseId &&
              `course/main-photo/${courseId}`
            }
          />
        </FormField>
        <FormField labelText="Title" name="title">
          <Input type="text" placeholder="NodeJS Course" />
        </FormField>
        <FormField labelText="Description" name="description">
          <Input type="text" placeholder="Course about...." />
        </FormField>
        <FormField labelText="Price" name="price">
          <Input type="text" placeholder="410" />
        </FormField>
<<<<<<< HEAD
        <Box mt="10">
          <Controller
            name="content"
            render={(field) => (
              <Editor
                {...field}
                apiKey="f77pjcz1vwa1mi1almj8uhwj2crs196lq21stcyj2dq0w8pf"
                initialValue={courseStore?.courseContent}
                init={{
                  height: 400,
                  directionality: 'ltr',
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
                onEditorChange={(e) => {
                  field.field.onChange(e);
                  debounceLoadData();
                }}
              />
            )}
          />
        </Box>
=======
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange } }) => (
            <Editor
              apiKey="f77pjcz1vwa1mi1almj8uhwj2crs196lq21stcyj2dq0w8pf"
              initialValue={courseStore?.courseContent}
              onEditorChange={onChange}
              init={{
                height: 400,
                directionality: 'ltr',
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
            />
          )}
        />
>>>>>>> dev

        <Link to={`/dashboard/course/edit/content/${courseId}`}>
          Edytuj zawartość kursu
        </Link>
        <Link to={`/dashboard/course/edit/details/${courseId}/category`}>
          Kategorie
        </Link>
        <Button type="submit" disabled={!isValid} inProgress={inProgress}>
          Opublikuj kurs
        </Button>
      </form>
    </FormProvider>
  );
});
