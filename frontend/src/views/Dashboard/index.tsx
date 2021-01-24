import { Box, SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";

const Dashboard: FC = () => {
  return (
    <SimpleGrid columns={2} gap={1}>
      <Box>Witamy na dashboard po zalogowaniu</Box>
    </SimpleGrid>
  );
};

export default Dashboard;
