import { GridItem, Image } from '@chakra-ui/react';
import React, { FC } from 'react';
import { LoginForm } from '../../components/forms/Login';
import useHeader from '../../hooks/useHeader';
import LoginImg from '../../assets/login-enter.png';
import LoginDesktop from '../../assets/login-desktop.jpg';
import ContainerPhotoContent from '../../components/layout/ContainerPhotoContent';
//TODO ADD BRAND IMAGE INSTEAD OF LOGIN DESKTOP
const Login: FC = () => {
  useHeader('Welcome back!', '', true);
  return (
    <ContainerPhotoContent
      image={<Image boxSize="100%" src={LoginDesktop} objectFit="cover" />}
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
