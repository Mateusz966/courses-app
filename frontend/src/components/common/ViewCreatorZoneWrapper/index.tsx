import { Center, Divider, Grid, GridItem } from '@chakra-ui/layout';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const tilesDetails = [
  {
    tileName: 'Stwórz kurs',
    pathLink: '/dashboard/course/add/category',
    cStart: [2],
    rStart: [2, 2, 2],
    m: [3, 6],
    p: [10, 6],
  },
  {
    tileName: 'Zarządzaj kursami',
    pathLink: '/dashboard/course/manage',
    cStart: [2, 3, 3],
    rStart: [3, 2, 2],
    m: [3, 6],
    p: [10, 6],
  },
  {
    tileName: 'Statystyki',
    pathLink: '',
    cStart: [2, 4, 4],
    rStart: [4, 2, 2],
    m: [3, 6],
    p: [10, 6],
  },
];
const ViewCreatorZoneWrapper: FC = () => {
  const tiles = tilesDetails.map(
    ({ tileName, pathLink, cStart, rStart, m, p }) => (
      <GridItem
        colStart={cStart}
        colSpan={1}
        rowStart={rStart}
        m={m}
        p={p}
        as={Link}
        to={pathLink}
        rounded="lg"
        boxShadow="xl"
      >
        <Center>{tileName}</Center>
      </GridItem>
    ),
  );
  return (
    <Grid
      templateColumns={['repeat(3, 1fr)', null, 'repeat(5, 1fr)']}
      templateRows="repeat(2, 1fr)"
    >
      <GridItem colStart={[1, 2, 2]} colSpan={3} m={6} p={6}>
        <Center>Witaj w strefie twórcy</Center>
        <Divider m={6} />
      </GridItem>
      {tiles}
    </Grid>
  );
};
export default ViewCreatorZoneWrapper;
