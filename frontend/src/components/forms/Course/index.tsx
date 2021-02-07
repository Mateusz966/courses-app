import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC, useCallback, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { loginSchema } from '../../../formSchemas/login';
import { useLogin } from '../../../hooks/useLogin';
import { FormField } from '../../common/FormField';
import { Input } from '../../common/FormField/Input';
import { FormBottomText } from '../../common/FormBottomText';
import { Button } from '../../common/Button';
import { UserLogin } from '../../../app-types/user';
import { Editor } from '@tinymce/tinymce-react';

export const CourseForm: FC = () => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const [content, setContent] = useState();

  const handleEditorChange = useCallback(
    (content, editor) => {
      setContent(content);
    },
    [content]
  );

  const { isValid } = methods.formState;

  return (
    <FormProvider {...methods}>
      <Box maxW="425px" margin="auto" as="form">
        <FormField labelText="Title" inputName="title">
          <Input type="text" placeholder="NodeJS Course" />
        </FormField>
        <FormField labelText="Description" inputName="description">
          <Input type="text" placeholder="Course about...." />
        </FormField>
        <Editor
          apiKey="f77pjcz1vwa1mi1almj8uhwj2crs196lq21stcyj2dq0w8pf"
          initialValue="<p>This is the initial content of the editor</p>"
          init={{
            height: 400,
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
