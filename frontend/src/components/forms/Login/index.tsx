import { Button } from "@chakra-ui/react";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useCategories } from "../../../hooks/useCategories";
import { useLogin } from "../../../hooks/useLogin";
import { useRegister } from "../../../hooks/useRegister";
import { FormField } from "../../common/FormField"
import { Input } from "../../common/FormField/Input"
import { FormSelect } from "../../common/FormField/Select";



export const LoginForm = () => {
  const methods = useForm({
    mode: 'onBlur',
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
            isRequired
            placeholder="example@example.com"
          />
        </FormField>
        <FormField
          labelText="Hasło"
          inputName="password"
        >
          <Input
            type="password"
            isRequired
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
      </form>
    </FormProvider>
  )
};