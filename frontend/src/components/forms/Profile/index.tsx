import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useRegister } from '../../../hooks/useRegister';
import { FormField } from '../../common/FormField';
import { Input } from '../../common/FormField/Input';
import { registerSchema } from '../../../formSchemas/register';
import { Button } from '../../common/Button';
import { SignUpUserPayload } from '../../../interal-types/user';
import user from '../../../slices/user';

export const ProfileForm: FC = () => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  });

  const { submit, inProgress } = useRegister();
  const userName = `Obecne imie ${user.name}`
  const { isValid } = methods.formState;

  return (
    <FormProvider {...methods}>
      <Box
        maxW="100%"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit((payload: SignUpUserPayload) =>
          submit(payload, methods.setError)
        )}
      >
        <FormField labelText={userName} inputName="firstName">
          <Input type="text" placeholder="Mati" />
        </FormField>
        <FormField labelText="Last name" inputName="lastName">
          <Input type="text" placeholder="Itam" />
        </FormField>
        <FormField labelText="Password" inputName="password">
          <Input type="password" placeholder="*****" />
        </FormField>
        <Button type="submit" isValid={isValid} inProgress={inProgress}>
          Zapisz zmiany
        </Button>
      </Box>
    </FormProvider>
  );
};
