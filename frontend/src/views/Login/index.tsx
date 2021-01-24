import { Container, GridItem } from '@chakra-ui/react';
import React, { FC } from 'react';
import { LoginForm } from '../../components/forms/Login';
import useHeader from '../../hooks/useHeader';

const Login: FC = () => {
  useHeader('Welcome back!', '', undefined, true);
  return (
    <Container>
     <GridItem>
       <LoginForm />
     </GridItem>
    </Container>
  );
};

export default Login;
