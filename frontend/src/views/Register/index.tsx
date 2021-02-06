import { GridItem, Image } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import ContainerPhotoContent from '../../components/layout/ContainerPhotoContent';
import { RegisterForm } from '../../components/forms/Register';
import LoginDesktop from '../../assets/login-desktop.jpg';
import LoginImg from '../../assets/login-enter.png';
import { useRootStore } from '../../stores/storeContext';

//TODO ADD BRAND IMAGE INSTEAD OF LOGIN DESKTOP

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
