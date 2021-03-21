import { Box, Spinner } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CourseForm } from '../../../components/forms/Course';

const EditCourse: FC = observer(() => {
  const { courseId } = useParams<{courseId: string}>();
  const methods = useForm({
    mode: 'onChange',
  });

    if (!courseId) {
      return <Spinner />
    }

  return (
    <FormProvider {...methods} >
      <Box as="section">
        <CourseForm />
      </Box>
    </FormProvider>
  );
});

export default EditCourse;
