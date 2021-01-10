import { Button } from "@chakra-ui/react";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useCategories } from "../../../hooks/useCategories";
import { useRegister } from "../../../hooks/useRegister";
import { FormField } from "../../common/FormField"
import { Input } from "../../common/FormField/Input"
import { FormSelect } from "../../common/FormField/Select";



export const RegisterForm = () => {
  const methods = useForm({
    mode: 'onBlur',
  });

  const { categories } = useCategories();
  const { submit } = useRegister();


  const { isValid } = methods.formState;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        <FormField
          labelText="Imię"
          inputName="firstName"
        >
          <Input
            type="text"
            name="firstName"
            isRequired
            placeholder="Mati"
          />
        </FormField>
        <FormField
          labelText="Nazwisko"
          inputName="lastName"
        >
          <Input
            type="text"
            name="lastName"
            isRequired
            placeholder="Itam"
          />
        </FormField>
        <FormField
          labelText="Email"
          inputName="email"
        >
          <Input
            type="email"
            name="email"
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
            name="password"
            isRequired
            placeholder="*****"
          />
        </FormField>
        <FormField
          labelText="Kategorie"
          inputName="userCategories"
          helperText="Wybierz swoje zainteresowania"
        >
          <FormSelect
            name="userCategories"
            isRequired
            isMulti
            options={categories ?? []}
          />
        </FormField>
        <Button
          type="submit"
          disabled={!isValid}
          mt={20}
        >
          Sign Up
        </Button>
      </form>
    </FormProvider>
  )
};