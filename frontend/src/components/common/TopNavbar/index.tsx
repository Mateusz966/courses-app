import { Box, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../config/store';
import { MdArrowBack, MdMenu } from 'react-icons/md';
import { MainDrawer } from '../Drawer';

export const TopNavBar: FC = () => {
  return (
    <Grid p="4">
      <GridItem>
        <MainDrawer />
      </GridItem>
      <GridItem></GridItem>
    </Grid>
  );
};
