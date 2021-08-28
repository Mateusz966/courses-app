import { GridItem, Image } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { LoginForm } from '../../components/forms/Login';
import LoginImg from '../../assets/login-enter.png';
import LoginDesktop from '../../assets/login-desktop.jpg';
import ContainerPhotoContent from '../../components/layout/ContainerPhotoContent';
import { useRootStore } from '../../stores/storeContext';

// TODO ADD BRAND IMAGE INSTEAD OF LOGIN DESKTOP
const Login: FC = () => {
  const { headerStore } = useRootStore();

  useEffect(() => {
    headerStore.setHeader({ title: 'Welcome back!', noLeft: true });
  }, [headerStore]);

  return (
    <ContainerPhotoContent
      image={
        <Image boxSize="100%" h="100vh" src={LoginDesktop} objectFit="cover" />
      }
      content={
        <>
          <GridItem>
            <Image src={LoginImg} margin="auto" objectFit="cover" />
          </GridItem>
          <GridItem>
            <LoginForm />
          </GridItem>
        </>
      }
    />
  );
};

export default Login;
