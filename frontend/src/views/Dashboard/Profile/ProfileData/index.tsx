import {
  Box,
  Center,
  Grid,
  GridItem,
  Container,
  Link,
  Heading,
  Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { Link as RLink } from 'react-router-dom';
import { ProfileForm } from '../../../../components/forms/Profile/ProfileData';
import { useRootStore } from '../../../../stores/storeContext';

const Profile: FC = observer(() => {
  const {
    userStore: { user, getUserDetails },
  } = useRootStore();

  useEffect(() => {
    if (!user?.details) {
      getUserDetails();
    }
  }, [getUserDetails, user?.details]);

  return (
    <Box as="section" marginTop="5%">
      <Container maxW="xl" centerContent>
        <Grid templateRows="1fr" templateColumns="1fr" gap={2}>
          <GridItem w="100%" colSpan={2}>
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
                  {user?.details?.firstName} {user?.details?.lastName}
                </Text>
              </Heading>
            </Center>
          </GridItem>
          <GridItem w="100%" colSpan={3}>
            <Link as={RLink} to="/dashboard/profile/set-password">
              Change password
            </Link>
            <Center>
              <ProfileForm />
            </Center>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
});
export default Profile;
