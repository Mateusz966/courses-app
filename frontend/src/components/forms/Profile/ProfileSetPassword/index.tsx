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

  const {
    setError,
    formState: { isValid },
  } = methods;

  const { submit, inProgress } = useProfileSetPassword({ setError });

  return (
    <FormProvider {...methods}>
      <Box
        maxW="100%"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit(submit)}
      >
        <FormField labelText="Podaj stare hasło" name="oldPassword">
          <Input type="password" placeholder="*****" />
        </FormField>
        <FormField labelText="Podaj nowe hasło" name="newPassword">
          <Input type="password" placeholder="*****" />
        </FormField>
        <Button type="submit" disabled={!isValid} inProgress={inProgress}>
          Resetuj
        </Button>
      </Box>
    </FormProvider>
  );
};
