import { Button, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useCategories } from '../../../hooks/useCategories';
import { useRegister } from '../../../hooks/useRegister';
import { FormField } from '../../common/FormField';
import { Input } from '../../common/FormField/Input';
import { FormSelect } from '../../common/FormField/Select';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../../formSchemas/register';
import { UserSignUp } from '../../../interal-types/user';
import { history } from '../../../config/history';

export const RegisterForm: FC = () => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  });

  const { categories } = useCategories();
  const { submit, inProgress } = useRegister();

  const { isValid } = methods.formState;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((payload: UserSignUp) =>
          submit(payload, methods.setError)
        )}
      >
        <FormField labelText="First name" inputName="firstName">
          <Input type="text" placeholder="Mati" />
        </FormField>
        <FormField labelText="Last name" inputName="lastName">
          <Input type="text" placeholder="Itam" />
        </FormField>
        <FormField labelText="Email" inputName="email">
          <Input type="email" placeholder="example@example.com" />
        </FormField>
        <FormField labelText="Password" inputName="password">
          <Input type="password" placeholder="*****" />
        </FormField>
        <FormField
          labelText="Categories"
          inputName="userCategories"
          helperText="Select your interests"
        >
          <FormSelect isMulti options={categories ?? []} />
        </FormField>
        <Button
          type="submit"
          disabled={!isValid || inProgress}
          mt={6}
          w="100%"
          borderRadius="25px"
          isLoading={inProgress}
          loadingText="Submitting"
          colorScheme="teal"
        >
          Sign Up
        </Button>
        <Text display="flex" justifyContent="center" w="100%" mt="5" textAlign="center" fontSize="sm">
          Already have a account? 
          <Button onClick={() => history.push('/sign-in')} ml="1" fontSize="sm" variant="link"> Sign In</Button>
        </Text>
      </form>
    </FormProvider>
  );
};
