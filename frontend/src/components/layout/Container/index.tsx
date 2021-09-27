import { FC } from 'react';
import { ContainerProps, Grid } from '@chakra-ui/react';

type Props = ContainerProps;

export const Container: FC<Props> = ({ children }) => (
  <Grid
    templateColumns="1fr"
    maxWidth={['30em', null, '48em', '62em']}
    margin="auto"
    gap={2}
  >
    {children}
  </Grid>
);
