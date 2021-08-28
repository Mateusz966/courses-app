import { Box, Grid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { defaultGap } from '../../../../config/globalStyles';
import { Button } from '../../../common/Button';
import { FormField } from '../../../common/FormField';
import { Input } from '../../../common/FormField/Input';
import { Textarea } from '../../../common/FormField/Textarea';
import { useCreateContent } from '../../../../hooks/useCreateContent';
import { Video } from '../../../common/FormField/Video';
import { CourseContentReq } from '../../../../app-types/course';

export const CreateCourseContent: FC = observer(() => {
  const { courseId } = useParams<{
    courseId: string;
    sectionId?: string;
  }>();
  const methods = useForm({
    mode: 'onChange',
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

  const { submit } = useCreateContent({ setError });

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
        {fields.map((field, index) => (
          <>
            <Box as="li" w="100%" key={field.id}>
              <FormField name={`lesson.${index}.id`}>
                <Input type="hidden" />
              </FormField>
              <FormField
                labelText="Nazwa lekcji"
                name={`lesson.${index}.title`}
              >
                <Input type="text" placeholder="Nazwa sekcji" />
              </FormField>
              <FormField
                labelText="Opis lekcji"
                name={`lesson.${index}.description`}
              >
                <Textarea placeholder="opis lekcji" />
              </FormField>
              <FormField
                labelText="Miejsce na video"
                name={`lesson.${index}.video`}
              >
                <Video name={field.id} />
              </FormField>
            </Box>
          </>
        ))}
        <Button
          w="auto"
          ml="auto"
          type="button"
          disabled={!isValid}
          onClick={() =>
            append({
              id: uuidv4(),
            })
          }
        >
          Add lesson
        </Button>
        <Button type="submit" w="100%" ml="auto" variant="outline">
          Add section
        </Button>
      </Grid>
    </FormProvider>
  );
});
