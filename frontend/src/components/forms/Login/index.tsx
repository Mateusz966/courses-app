import { Button, Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { loginSchema } from '../../../formSchemas/login';
import { useLogin } from '../../../hooks/useLogin';
import { FormField } from '../../common/FormField';
import { Input } from '../../common/FormField/Input';
import { history } from '../../../config/history';

export const LoginForm: FC = () => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const { submit } = useLogin();
  const { isValid } = methods.formState;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        <FormField labelText="Email" inputName="email">
          <Input type="email" placeholder="example@example.com" />
        </FormField>
        <FormField labelText="Password" inputName="password">
          <Input name="password" type="password" placeholder="*****" />
        </FormField>
        <Box textAlign="center" w="100%">
        <Button variant="link" onClick={() => history.push('sign-up')}>
          Dont have account?
        </Button>
        </Box>
        <Button type="submit" disabled={!isValid}>
          Sign In
        </Button>
      </form>
    </FormProvider>
  );
};
