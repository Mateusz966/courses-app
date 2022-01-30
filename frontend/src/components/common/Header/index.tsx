import { Box, Container, Flex, Icon, Text, Heading } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useRootStore } from '../../../stores/storeContext';

export const Header: FC = observer(() => {
  const { headerStore } = useRootStore();
  if (headerStore.header.hide) return null;
  return (
    <Container d="none" mt={4} mb={10}>
      <Flex align="center">
        {!headerStore.header.noLeft && (
          <Box mr={4}>
            <Icon color="#4FD1C5" w="5" h="5" as={MdArrowBack} />
          </Box>
        )}
        <Box>
          <Heading color="#4FD1C5" size="lg" mb={1}>
            {headerStore.header.title}
          </Heading>
          {headerStore.header.subtitle && (
            <Text fontSize="xs">{headerStore.header.subtitle}</Text>
          )}
        </Box>
      </Flex>
    </Container>
  );
});
