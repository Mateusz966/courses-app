import { SimpleGrid, Box, Heading, Center } from "@chakra-ui/react";
import React, { FC } from "react";
import { RegisterForm } from "../../components/forms/Register";

const Register: FC = () => {
  return (
    <SimpleGrid columns={1} gap={1}>
      <Box marginTop="150">
        <Center flexWrap="wrap">
          <Heading mb={10} w="100%" textAlign="center">
            Rejestracja
          </Heading>
          <RegisterForm />
        </Center>
      </Box>
    </SimpleGrid>
  );
};

export default Register;
