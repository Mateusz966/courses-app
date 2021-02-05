import {
  Box,
  Center,
  Grid,
  GridItem,
  Container,
  Image,
  Circle,
} from '@chakra-ui/react';
import { FC } from 'react';
import avatar from '../../assets/blank-profile.svg';
import { ProfileForm } from '../../components/forms/Profile';

const userName = 'dupa';
const Profile: FC = () => {
  return (
    <Box as="section">
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
            <Center>Profil użytkownika {userName}</Center>
          </GridItem>
          <GridItem w="100%" colSpan={3}>
            <Center>
              <ProfileForm />
            </Center>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};
export default Profile;
