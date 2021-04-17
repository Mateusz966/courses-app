import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useProfileSetPassword } from '../../../../hooks/useProfileSetPassword';
import { FormField } from '../../../common/FormField';
import { Input } from '../../../common/FormField/Input';
import { Button } from '../../../common/Button';
import { profileSetPasswordSchema } from '../../../../formSchemas/profileSetPassword';


export const ProfileSetPasswordForm: FC = () => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(profileSetPasswordSchema),
  });

  const { submit, inProgress } = useProfileSetPassword();
  const { isValid } = methods.formState;

  return (
    <FormProvider {...methods}>
      <Box
        maxW="100%"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit((payload: any) =>
          submit(payload, methods.setError)
        )}
      >
        <FormField labelText="Podaj stare hasło" inputName="oldPassword">
          <Input type="password" placeholder="*****" />
        </FormField>
        <FormField labelText="Podaj nowe hasło" inputName="newPassword">
          <Input type="password" placeholder="*****" />
        </FormField>
        <Button type="submit" disabled={!isValid} inProgress={inProgress}>
          Resetuj
        </Button>
      </Box>
    </FormProvider>
  );
};
