import {
  Box,
  Center,
  Grid,
  GridItem,
  Container,
  Image,
  Circle,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Route } from 'react-router-dom';
import avatar from '../../../assets/blank-profile.svg';
import { ProfileForm } from '../../../components/forms/Profile/ProfileData';
import { useRootStore } from '../../../stores/storeContext';
import ProfileSetPassword from '../ProfileSetPassword';

const Profile: FC = observer(() => {
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
              {
                <Image
                  boxSize="100%"
                  src={avatar}
                  objectFit="cover"
                  alt="User profile photo"
                />
              }
            </Circle>
          </GridItem>
          <GridItem w="100%">
            <Center>
              Profil użytkownika {userStore.user.details?.firstName}{' '}
              {userStore.user.details?.lastName}
            </Center>
          </GridItem>
          <GridItem w="100%" colSpan={3}>
            ssss
            <Route
              exact
              path="/profile-set-password"
              component={ProfileSetPassword}
            />
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
