import React, { FC, useEffect, useState } from 'react';
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
import ImagePicker from '../../../common/FormField/File';

export const ProfileForm: FC = observer(() => {
  const { userStore: { user } } = useRootStore();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
  });

  const { submit, inProgress } = useProfile();
  const { isValid } = methods.formState;

  useEffect(() => {
     if (user.details) {
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
          submit(payload, methods.setError)
        )}
      >
        <FormField inputName="photoFn">
          <ImagePicker 
            desktopRatio={22 / 9} 
            previewUrl={`user/avatar`}
          />
        </FormField>
        <FormField
          labelText={`Obecne imie ${user.details?.firstName}`}
          inputName="firstName"
        >
          <Input type="text" placeholder="Mati" />
        </FormField>
        <FormField
          labelText={`Obecne Nazwisko ${user.details?.lastName}`}
          inputName="lastName"
        >
          <Input type="text" placeholder="Itam" />
        </FormField>
        <Button disabled={!isValid} type="submit" inProgress={inProgress}>
          Zapisz zmiany
        </Button>
      </Box>
    </FormProvider>
  );
});