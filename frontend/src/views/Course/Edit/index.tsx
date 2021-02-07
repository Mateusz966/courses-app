import { Box, Spinner } from '@chakra-ui/react';
import React, { FC, useCallback, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const EditCourse: FC = () => {
  const { courseId } = useParams<{courseId: string}>();
  const [content, setContent] = useState();
  const methods = useForm({
    mode: 'onChange',
  });



    if (!courseId) {
      return <Spinner />
    }

  return (
    <FormProvider {...methods} >
      <Box as="section">
        
      </Box>
    </FormProvider>
  );
};

export default EditCourse;
