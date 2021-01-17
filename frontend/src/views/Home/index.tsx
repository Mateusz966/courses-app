import { Box, SimpleGrid, Center, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { LoginForm } from "../../components/forms/Login";
import { RegisterForm } from "../../components/forms/Register";
import { history } from "../../config/history";

const Home: FC = () => {
  return (
    <SimpleGrid columns={2} gap={1}>
      <Box>
        <Center flexWrap="wrap" bg="white" height="100vh">
          <Box>
            <Heading mb={10} w="100%" textAlign="center">
              Rejestracja
            </Heading>
            <RegisterForm />
          </Box>
        </Center>
      </Box>
      <Box bg="white">
        <Center flexWrap="wrap" height="100vh">
          <Box>
            <Heading mb={10} w="100%" textAlign="center">
              Logowanie
            </Heading>
            <LoginForm />
          </Box>
        </Center>
      </Box>
    </SimpleGrid>
  )
}

export default Home;