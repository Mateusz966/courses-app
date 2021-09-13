import { Box, Text, Heading, Stack } from '@chakra-ui/react';
import React from 'react';

interface Props {
  content: string;
}

export const ViewCourseLongDesc: React.FC<Props> = ({ content }) => (
  <Box pb="3">
    <Heading as="h2" size="lg" mt="10" mb="5">
      Dlaczego warto kupić ten kurs
    </Heading>
    <Stack spacing={2}>
      <Text dangerouslySetInnerHTML={{ __html: content }} />
    </Stack>
  </Box>
);
