import { Grid, GridItem, Container } from '@chakra-ui/react';
import { FC } from 'react';
import { MainDrawer } from '../Drawer';
import { SearchLoop } from '../SearchLoop';
import { NavUserActions } from '../NavUserActions';
import { TopNavbarLinks } from '../TopNavbarLinks';

export const TopNavBar: FC = () => (
  <Container maxW="90vw">
    <Grid
      pb={{ md: 3, base: 1 }}
      pr="2"
      pt="3"
      pl="0"
      gridTemplateRows="1fr"
      gridTemplateColumns={{
        lg: 'fit-content(200px) 3fr 2fr 2fr',
        md: 'fit-content(200px) 2fr 1fr 1fr',
        base: '3fr 5fr',
      }}
      gridTemplateAreas="'drawer search links userAcc'"
      alignItems="center"
      justifyContent="end"
      gridColumnGap={{ md: '4' }}
    >
      <GridItem gridArea="drawer">
        <MainDrawer />
      </GridItem>
      <GridItem gridArea="search" ml={{ md: '9' }}>
        <SearchLoop />
      </GridItem>
      <GridItem gridArea="links" display={{ md: 'block', base: 'none' }}>
        <TopNavbarLinks />
      </GridItem>
      <GridItem gridArea="userAcc" display={{ md: 'block', base: 'none' }}>
        <NavUserActions justifyContentType="flex-end" />
      </GridItem>
    </Grid>
  </Container>
);
