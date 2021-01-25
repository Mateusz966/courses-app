import { Container, Grid, GridItem, Image } from '@chakra-ui/react';
import React, { FC } from 'react';
import { LoginForm } from '../../components/forms/Login';
import useHeader from '../../hooks/useHeader';
import LoginImg from '../../assets/login-enter.png';
import LoginDesktop from '../../assets/login-desktop.jpg';
import ContainerPhotoContent from '../../components/common/Layout/ContainerPhotoContent';

const Login: FC = () => {
  useHeader('Welcome back!', '', undefined, true);
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
