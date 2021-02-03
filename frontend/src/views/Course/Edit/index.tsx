import { Box, Button } from '@chakra-ui/react';
import React, { FC, useCallback, useState } from 'react';
import useHeader from '../../../hooks/useHeader';
import { Editor } from '@tinymce/tinymce-react';
import { FormProvider, useForm } from 'react-hook-form';

const EditCourse: FC = () => {
  useHeader('', undefined, '', undefined, undefined, true);
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

  return (
    <FormProvider {...methods} >
      <Box as="section">
        <Editor
          apiKey="f77pjcz1vwa1mi1almj8uhwj2crs196lq21stcyj2dq0w8pf"
          initialValue="<p>This is the initial content of the editor</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
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
