import { Box, Container, Flex, Icon, Text, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../config/store';
import { MdArrowBack } from 'react-icons/md';

export const Header: FC = () => {
  const { title, back, noLeft, hideOnMobile, hide, subtitle } = useSelector(
    (state: RootState) => state.header
  );
  const user = useSelector((state: RootState) => state.user.details);
  if (hide) return null;
  return (
    <Container display={{lg: 'none'}} mt={4} mb={10}>
      <Flex align="center">
        {!noLeft && (
          <Box mr={4}>
            <Icon color="#4FD1C5" w="5" h="5" as={MdArrowBack} />
          </Box>
        )}
        <Box>
          <Heading color="#4FD1C5" size="lg" mb={1}>
            {title}
          </Heading>
          {subtitle && <Text fontSize="xs">{subtitle}</Text>}
        </Box>
      </Flex>
    </Container>
  );
};
