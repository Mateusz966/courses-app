import { Grid, GridItem, Image, Box } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import ContainerPhotoContent from '../../components/layout/ContainerPhotoContent';
import { RegisterForm } from '../../components/forms/Register';
import LoginDesktop from '../../assets/login-desktop.jpg';
import LoginImg from '../../assets/login-enter.png';
import { useRootStore } from '../../stores/storeContext';

// TODO ADD BRAND IMAGE INSTEAD OF LOGIN DESKTOP

const Register: FC = () => {
  const { headerStore } = useRootStore();

  useEffect(() => {
    headerStore.setHeader({
      title: 'Sign up',
      subtitle: 'Create your account',
      noLeft: true,
    });
  }, [headerStore]);

  return (
    <ContainerPhotoContent
      image={
        <Box d={{ md: 'block', base: 'none' }}>
          <Image
            boxSize="100%"
            h="100vh"
            src={LoginDesktop}
            objectFit="cover"
          />
        </Box>
      }
      content={
        <>
          <Grid templateColumns="repeat(1, 1fr)">
            <GridItem>
              <Box d={{ md: 'block', base: 'none' }}>
                <Image
                  src={LoginImg}
                  margin="auto"
                  objectFit="cover"
                  maxH={250}
                />
              </Box>
            </GridItem>
            <GridItem>
              <RegisterForm />
            </GridItem>
          </Grid>
        </>
      }
    />
  );
};

export default Register;
