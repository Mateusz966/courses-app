import { Container, Grid } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface Props {
  image: ReactNode;
  content: ReactNode;
}

const ContainerPhotoContent: FC<Props> = ({ image, content }) => (
  <Container
    gridTemplateColumns={{ lg: '1fr 1fr 1fr 1fr' }}
    gridTemplateRows={{ lg: '1fr' }}
    gridTemplateAreas={{
      lg: '"photo photo content content"',
    }}
    maxW="100%"
    height={{ lg: '100vh' }}
    display="grid"
    padding={{ lg: 0 }}
  >
    <Grid display={{ lg: 'grid', base: 'none' }} gridArea="photo">
      {image}
    </Grid>
    <Grid alignContent="center" gridArea="content">
      {content}
    </Grid>
  </Container>
);

export default ContainerPhotoContent;
