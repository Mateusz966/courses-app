import { GridItem, Container, Image } from '@chakra-ui/react';
import React, { FC } from 'react';
import ContainerPhotoContent from '../../components/common/Layout/ContainerPhotoContent';
import { RegisterForm } from '../../components/forms/Register';
import useHeader from '../../hooks/useHeader';
import LoginDesktop from '../../assets/login-desktop.jpg';
import LoginImg from '../../assets/login-enter.png';

//TODO ADD BRAND IMAGE INSTEAD OF LOGIN DESKTOP

const Register: FC = () => {
  useHeader('Sign up', 'Create your account', undefined, true);
  return (
    <ContainerPhotoContent
      image={<Image boxSize="100%" src={LoginDesktop} objectFit="cover" />}
      content={
        <>
          <GridItem>
            <Image src={LoginImg} margin="auto" objectFit="cover" />
          </GridItem>
          <GridItem>
            <RegisterForm />
          </GridItem>
        </>
      }
    />
  );
};

export default Register;
