import { GridItem, Container } from '@chakra-ui/react';
import React, { FC } from 'react';
import { RegisterForm } from '../../components/forms/Register';
import useHeader from '../../hooks/useHeader';

const Register: FC = () => {
  useHeader('Sign up', 'Create your account', undefined, true);
  return (
    <Container>
     <GridItem>
       <RegisterForm />
     </GridItem>
    </Container>
  );
};

export default Register;
