import { Box, SimpleGrid, Center, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { LoginForm } from "../../components/forms/Login";

const Home: FC = () => {
  return (
    <SimpleGrid columns={1} gap={1}>
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
  );
};

export default Home;
