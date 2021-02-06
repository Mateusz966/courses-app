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

  const handleEditorChange = useCallback(
    (content, editor) => {
      setContent(content);
    },
    [content]
  );

    if (!courseId) {
      return <Spinner />
    }

  return (
    <FormProvider {...methods} >
      <Box as="section">
        <Editor
          apiKey="f77pjcz1vwa1mi1almj8uhwj2crs196lq21stcyj2dq0w8pf"
          initialValue="<p>This is the initial content of the editor</p>"
          init={{
            height: 400,
            // menubar: false,
            plugins: [
              'advlist autolink lists link image charmap preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime medi paste code help',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
          }}
          onEditorChange={handleEditorChange}
        />
      </Box>
    </FormProvider>
  );
};

export default EditCourse;
