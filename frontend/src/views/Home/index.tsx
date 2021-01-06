import { Box, SimpleGrid, Center } from "@chakra-ui/react";
import { FC } from "react";
import { mainSpacing } from "../../config/globalStyles";

const Home: FC = () => {
  return (
    <SimpleGrid columns={2} spacing={mainSpacing}>
      <Box>
        <Center bg="black" height="100vh">
          <p>
            Rejestracja
          </p>
        </Center>
      </Box>
      <Box bg="white">
        <Center height="100vh">
          <p>
            text
          </p>
        </Center>
      </Box>
    </SimpleGrid>
  )
}

export default Home;