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
        <SimplyCourseList categories="58f7a0fe-231b-4871-b4a7-cf8decb486a6" />
      </GridItem>
      <GridItem rowSpan={1} colSpan={1} />
    </Grid>
  </>
);

export default Start;
