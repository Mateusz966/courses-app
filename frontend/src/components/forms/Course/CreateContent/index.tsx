import { Box, Grid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { defaultGap } from '../../../../config/defaultStyles';
import { Button } from '../../../common/Button';
import { FormField } from '../../../common/FormField';
import { Input } from '../../../common/FormField/Input';
import { v4 as uuidv4 } from 'uuid';
import { VideoPlayer } from '../../../common/VideoPlayer';
import { Textarea } from '../../../common/FormField/Textarea';

export const CreateCourseContent: FC = observer(() => {
  const { courseId, sectionId } = useParams<{
    courseId: string;
    sectionId?: string;
  }>();
  const methods = useForm({
    mode: 'onChange',
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: methods.control,
      name: 'lesson',
    }
  );

  return (
    <FormProvider {...methods}>
      <Grid as="ul" gap={defaultGap} templateColumns="1fr">
        <Box as="li" w="100%">
          <FormField labelText="Nazwa sekcji" inputName="sectionName">
            <Input type="text" placeholder="Nazwa sekcji" />
          </FormField>
        </Box>
        {fields.map((field, index) => (
          <>
            <Box as="li" w="100%" key={field.id}>
              <FormField inputName={`lesson.${index}.id`}>
                <Input type="hidden" />
              </FormField>
              <FormField
                labelText="Nazwa lekcji"
                inputName={`lesson.${index}.name`}
              >
                <Input type="text" placeholder="Nazwa sekcji" />
              </FormField>
              <FormField
                labelText="Opis lekcji"
                inputName={`lesson.${index}.description`}
              >
                <Textarea placeholder="opis lekcji" />
              </FormField>
              <VideoPlayer id={548993721} />
            </Box>
          </>
        ))}
      </Grid>
      <Button
        type="button"
        onClick={() =>
          append({
            id: uuidv4(),
          })
        }
      >
        dodaj
      </Button>
    </FormProvider>
  );
});
