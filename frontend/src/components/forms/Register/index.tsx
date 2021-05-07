import { FC, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useCategories } from '../../../hooks/useCategories';
import { useRegister } from '../../../hooks/useRegister';
import { FormField } from '../../common/FormField';
import { Input } from '../../common/FormField/Input';
import { FormSelect } from '../../common/FormField/Select';
import { registerSchema } from '../../../formSchemas/register';
import { FormBottomText } from '../../common/FormBottomText';
import { Button } from '../../common/Button';

export const RegisterForm: FC = () => {
  const methods = useForm({
    mode: 'onChange',
    // resolver: yupResolver(registerSchema),
  });

  const {
    setError,
    formState: { isValid },
  } = methods;

  const { categories, getCategories } = useCategories();
  const { submit, inProgress } = useRegister({ setError });

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <FormProvider {...methods}>
      <Box
        maxW="425px"
        margin="auto"
        as="form"
        onSubmit={methods.handleSubmit(submit)}
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
          <FormSelect isMulti defaultValue={null} options={categories ?? []} />
        </FormField>
        <Button type="submit" disabled={false} inProgress={inProgress}>
          Sign Up
        </Button>
        <FormBottomText
          text="Already have a account?"
          buttonText="Sign In"
          path="/sign-in"
        />
      </Box>
    </FormProvider>
  );
};
