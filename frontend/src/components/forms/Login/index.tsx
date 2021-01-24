import { Button } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { loginSchema } from "../../../formSchemas/login";
import { useLogin } from "../../../hooks/useLogin";
import { FormField } from "../../common/FormField"
import { Input } from "../../common/FormField/Input"
import { history } from '../../../config/history';




export const LoginForm = () => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const { submit } = useLogin();
  const { isValid } = methods.formState;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        <FormField
          labelText="Email"
          inputName="email"
        >
          <Input
            type="email"
            placeholder="example@example.com"
          />
        </FormField>
        <FormField
          labelText="Hasło"
          inputName="password"
        >
          <Input
            name="password"
            type="password"
            placeholder="*****"
          />
        </FormField>
        <Button
          type="submit"
          disabled={!isValid}
          mt={20}
        >
          Sign In
        </Button>
        <Button onClick={()=> history.push('sign-up')}>
          Dont have account?
        </Button>
      </form>
    </FormProvider>
  )
};