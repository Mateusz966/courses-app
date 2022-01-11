import {
  Box,
  Center,
  Grid,
  GridItem,
  Container,
  Image,
  Circle,
  Link,
  Heading,
  Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Link as RLink } from 'react-router-dom';
import { ProfileSetPasswordForm } from '../../../../components/forms/Profile/ProfileSetPassword';
import { useRootStore } from '../../../../stores/storeContext';
import { apiUrl } from '../../../../config/apiUrl';

const ProfileSetPassword: FC = observer(() => {
  const { userStore } = useRootStore();
  return (
    <Box as="section" marginTop="5%">
      <Container maxW="xl" centerContent>
        <Grid
          templateRows={{ lg: '0.3fr 1fr' }}
          templateColumns={{ lg: '0.2fr 1fr' }}
          gap={4}
        >
          <GridItem>
            <Circle>
              <Image
                boxSize="100%"
                src={`${apiUrl}/user/avatar`}
                objectFit="cover"
                alt="User profile photo"
              />
            </Circle>
          </GridItem>
          <GridItem w="100%">
            <Center>
              <Heading
                as="h1"
                fontSize="24px"
                mt={{ lg: '20px', base: '5px' }}
                mb="20px"
                textAlign="center"
              >
                Profil użytkownika{' '}
                <Text d="block" fontSize="32px" color="#2c7a7b">
                  {userStore.user.details?.firstName}{' '}
                  {userStore.user.details?.lastName}
                </Text>
              </Heading>
            </Center>
          </GridItem>
          <GridItem w="100%" colSpan={3}>
            <Link as={RLink} to="/dashboard/profile/details">
              My profile
            </Link>
            <Center>
              <ProfileSetPasswordForm />
            </Center>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
});
export default ProfileSetPassword;
