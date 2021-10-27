import { Box, Grid, Spinner } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultGap } from '../../../../config/globalStyles';
import { Button } from '../../../common/Button';
import { FormField } from '../../../common/FormField';
import { Input } from '../../../common/FormField/Input';
import { Textarea } from '../../../common/FormField/Textarea';
import { useCreateContent } from '../../../../hooks/useCreateContent';
import { Video } from '../../../common/FormField/Video';
import { CourseContentReq } from '../../../../app-types';
import { courseStore } from '../../../../stores/course';
import { createCourseContent } from '../../../../formSchemas/createCourseContent';

export const CreateCourseContent: FC = observer(() => {
  const { courseId } = useParams<{
    courseId: string;
    sectionId?: string;
  }>();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(createCourseContent),
  });
  const { fields, append } = useFieldArray({
    control: methods.control,
    name: 'lesson',
  });
  const {
    handleSubmit,
    setError,
    formState: { isValid },
  } = methods;

  const { submit, inProgress } = useCreateContent({ setError });

  useEffect(() => {
    if (courseStore.courseSectionLesson) {
      methods.reset(courseStore.courseSectionLesson);
    }
  }, [courseStore.courseSectionLesson]);

  if (inProgress) {
    return <Spinner />;
  }
  return (
    <FormProvider {...methods}>
      <Grid
        as="form"
        onSubmit={handleSubmit((payload: CourseContentReq) =>
          submit(payload, courseId),
        )}
        listStyleType="none"
        gap={defaultGap}
        templateColumns="1fr"
      >
        <Box as="li" w="100%">
          <FormField labelText="Nazwa sekcji" name="sectionName">
            <Input type="text" placeholder="Nazwa sekcji" />
          </FormField>
          <FormField labelText="Opis sekcji" name="sectionDescription">
            <Input type="text" placeholder="Opis sekcji" />
          </FormField>
        </Box>
        {fields.map((field: any, index) => (
          <Box as="li" w="100%" key={field.id}>
            <FormField name={`lesson.${index}.id`}>
              <Input type="hidden" defaultValue={v4()} />
            </FormField>
            <FormField labelText="Nazwa lekcji" name={`lesson.${index}.title`}>
              <Input
                defaultValue={field.title}
                type="text"
                placeholder="Nazwa sekcji"
              />
            </FormField>
            <FormField
              labelText="Opis lekcji"
              name={`lesson.${index}.description`}
            >
              <Textarea
                defaultValue={field.description}
                placeholder="opis lekcji"
              />
            </FormField>
            <FormField name={`lesson.${index}.videoFn`}>
              <Input type="hidden" />
            </FormField>
            <FormField
              labelText="Miejsce na video"
              name={`lesson.${index}.video`}
            >
              <Video
                previewUrl={field.videoFn}
                name={`lesson.${index}.video`}
              />
            </FormField>
          </Box>
        ))}
        <Button
          w="auto"
          ml="auto"
          type="button"
          disabled={!isValid}
          onClick={() => append({})}
        >
          Add lesson
        </Button>
        <Button
          disabled={!isValid || inProgress}
          type="submit"
          w="100%"
          ml="auto"
          variant="outline"
        >
          {courseStore.courseSectionLesson?.sectionName
            ? 'Edit section'
            : 'Add section'}
        </Button>
      </Grid>
    </FormProvider>
  );
});
