import { Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import SimplyCourseList from '../../../components/layout/SimplyCourseList';

const Start: FC = () => (
  <>
    <Link to="/dashboard/course/manage">Moje kursy</Link>
    <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(3, 1fr)">
      <GridItem rowSpan={1} colSpan={1} />
      <GridItem rowSpan={1} colSpan={1}>
        <SimplyCourseList />
      </GridItem>
      <GridItem rowSpan={1} colSpan={1} />
    </Grid>
  </>
);

export default Start;
