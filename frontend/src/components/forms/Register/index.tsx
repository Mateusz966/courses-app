import { Button } from '@chakra-ui/react';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useCategories } from '../../../hooks/useCategories';
import { useRegister } from '../../../hooks/useRegister';
import { FormField } from '../../common/FormField';
import { Input } from '../../common/FormField/Input';
import { FormSelect } from '../../common/FormField/Select';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../../formSchemas/register';
import { UserSignUp } from '../../../interal-types/user';

export const RegisterForm = () => {
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
        <FormField labelText="Imię" inputName="firstName">
          <Input type="text" placeholder="Mati" />
        </FormField>
        <FormField labelText="Nazwisko" inputName="lastName">
          <Input type="text" placeholder="Itam" />
        </FormField>
        <FormField labelText="Email" inputName="email">
          <Input type="email" placeholder="example@example.com" />
        </FormField>
        <FormField labelText="Hasło" inputName="password">
          <Input type="password" placeholder="*****" />
        </FormField>
        <FormField
          labelText="Kategorie"
          inputName="userCategories"
          helperText="Wybierz swoje zainteresowania"
        >
          <FormSelect isMulti options={categories ?? []} />
        </FormField>
        <Button type="submit" disabled={!isValid || inProgress} mt={20}>
          Sign Up
        </Button>
      </form>
    </FormProvider>
  );
};
