import { Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { MainDrawer } from '../Drawer';
import { SearchLoop } from '../SearchLoop';
import { NavUserActions } from '../NavUserActions';

export const TopNavBar: FC = () => {
  return (
    <Grid
      p="1"
      gridTemplateRows="1fr"
      gridTemplateColumns="1fr 3fr 1.5fr"
      gridTemplateAreas="'drawer brand userAcc'"
      alignItems="center"
    >
      <GridItem gridArea="drawer">
        <MainDrawer />
      </GridItem>
      <GridItem gridArea="brand" display={{ md: 'block', base: 'none' }}>
        <SearchLoop />
      </GridItem>
      <GridItem display={{ md: 'none', base: 'block' }}>Brand</GridItem>
      <GridItem gridArea="userAcc">
        <NavUserActions />
      </GridItem>
    </Grid>
  );
};
