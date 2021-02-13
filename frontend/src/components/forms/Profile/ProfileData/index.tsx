import { FC, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useProfile } from '../../../../hooks/useProfile';
import { FormField } from '../../../common/FormField';
import { Input } from '../../../common/FormField/Input';
import { Button } from '../../../common/Button';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../stores/storeContext';
import { profileSchema } from '../../../../formSchemas/profile';
import { UserMyProfile } from '../../../../app-types/user';

export const ProfileForm: FC = observer(() => {
  const { userStore } = useRootStore();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
  });

  const { submit, inProgress } = useProfile();
  const { isValid } = methods.formState;

  useEffect(() => {
    methods.reset(userStore.user?.details as any)
    }, [])

  return (
    <FormProvider {...methods}>
      <Box
        maxW="100%"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit((payload: UserMyProfile) =>
          submit(payload, methods.setError)
        )}
      >
        <FormField
          labelText={`Obecne imie ${userStore.user.details?.firstName}`}
          inputName="firstName"
        >
          <Input type="text" placeholder="Mati" />
        </FormField>
        <FormField
          labelText={`Obecne Nazwisko ${userStore.user.details?.lastName}`}
          inputName="lastName"
        >
          <Input type="text" placeholder="Itam" />
        </FormField>
        <Button type="submit" isValid={isValid} inProgress={inProgress}>
          Zapisz zmiany
        </Button>
      </Box>
    </FormProvider>
  );
});
