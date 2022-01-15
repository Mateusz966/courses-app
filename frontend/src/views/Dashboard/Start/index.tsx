import { Grid, GridItem, Container, Text, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import SimplyCourseList from '../../../components/layout/SimplyCourseList';

const Start: FC = () => (
  <>
    <Container maxW="90vw" mt="5">
      <Link to="/dashboard/course/manage">Moje kursy</Link>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(1, 1fr)"
        mt="30px"
      >
        <GridItem rowSpan={1} colSpan={1}>
          <Text textTransform="uppercase" color="#2c7a7b" fontWeight="medium">
            Sprawdź teraz
          </Text>
          <Heading as="h2">Najnowsze kursy</Heading>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <SimplyCourseList categories="58f7a0fe-231b-4871-b4a7-cf8decb486a6" />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} />
      </Grid>
    </Container>
  </>
);

export default Start;
