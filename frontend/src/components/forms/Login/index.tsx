import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { loginSchema } from '../../../formSchemas/login';
import { useLogin } from '../../../hooks/useLogin';
import { FormField } from '../../common/FormField';
import { Input } from '../../common/FormField/Input';
import { FormBottomText } from '../../common/FormBottomText';
import { Button } from '../../common/Button';
import { UserLogin } from '../../../app-types/user';

export const LoginForm: FC = () => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const { submit, inProgress } = useLogin();
  const { isValid } = methods.formState;

  return (
    <FormProvider {...methods}>
      <Box
        maxW="425px"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit((payload: UserLogin) => submit(payload, methods.setError))}
      >
        <FormField labelText="Email" inputName="email">
          <Input type="email" placeholder="example@example.com" />
        </FormField>
        <FormField labelText="Password" inputName="password">
          <Input name="password" type="password" placeholder="*****" />
        </FormField>
        <Button type="submit" isValid={isValid} inProgress={inProgress}>
          Sign In
        </Button>
        <Box textAlign="center" w="100%">
          <FormBottomText
            text="Dont have account?"
            buttonText="Sign Up"
            path="/sign-up"
          />
        </Box>
      </Box>
    </FormProvider>
  );
};
