import { SimpleGrid, Box, Heading, Center } from "@chakra-ui/react";
import React, { FC } from "react";
import { LoginForm } from "../../components/forms/Login";

const Login: FC = () => {
  return (
    <SimpleGrid columns={1} gap={1}>
      <Box marginTop="150">
        <Center flexWrap="wrap">  
          <Heading mb={10} w="100%" textAlign="center">
            Logowanie
          </Heading>
          <LoginForm />
        </Center>
      </Box>
    </SimpleGrid>
  )
}

export default Login;