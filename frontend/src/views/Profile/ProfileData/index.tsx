import {
  Box,
  Center,
  Grid,
  GridItem,
  Container,
  Link,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { ProfileForm } from '../../../components/forms/Profile/ProfileData';
import { useRootStore } from '../../../stores/storeContext';
import { Link as RLink } from 'react-router-dom';;

const Profile: FC = observer(() => {
  const {
    userStore: { user, getUserDetails },
  } = useRootStore();

  useEffect(() => {
    console.log('test');
    if (!user?.details) {
      getUserDetails();
    }
  }, [getUserDetails, user?.details]);

  return (
    <Box as="section" marginTop="5%">
      <Container maxW="xl" centerContent>
        <Grid
          templateRows="1fr"
          templateColumns="1fr"
          gap={2}
        >
          <GridItem w="100%" colSpan={2}>
            <Center>
              Profil użytkownika {user?.details?.firstName}{' '}
              {user?.details?.lastName}
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
