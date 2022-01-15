import React, { FC, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useProfile } from '../../../../hooks/useProfile';
import { FormField } from '../../../common/FormField';
import { Input } from '../../../common/FormField/Input';
import { Button } from '../../../common/Button';
import { useRootStore } from '../../../../stores/storeContext';
import { profileSchema } from '../../../../formSchemas/profile';
import ImagePicker from '../../../common/FormField/File';

export const ProfileForm: FC = observer(() => {
  const {
    userStore: { user },
  } = useRootStore();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
  });

  const { submit, inProgress } = useProfile();
  const { isValid } = methods.formState;

  console.log(methods.getValues());

  useEffect(() => {
    if (user.details) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { photoFn, ...details } = user.details;
      methods.reset(details);
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <Box
        maxW="100%"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit((payload: any) =>
          submit(payload, methods.setError),
        )}
      >
        <FormField name="photoFn">
          <ImagePicker desktopRatio={1 / 1} previewUrl="user/avatar" />
        </FormField>
        <FormField labelText="Imie" name="firstName">
          <Input type="text" placeholder="Mati" />
        </FormField>
        <FormField labelText="Nazwisko" name="lastName">
          <Input type="text" placeholder="Itam" />
        </FormField>
        <Button disabled={!isValid} type="submit" inProgress={inProgress}>
          Zapisz zmiany
        </Button>
      </Box>
    </FormProvider>
  );
});
