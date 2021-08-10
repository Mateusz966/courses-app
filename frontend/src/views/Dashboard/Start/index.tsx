import { Center } from '@chakra-ui/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import SimplyCourseList from '../../../components/layout/SimplyCourseList';

// const res = await get<CourseTableRes>('course/created/all?offset=0');

const Start: FC = () => (
  <>
    <Link to="/course">Moje kursy</Link>
    <Center>
      <SimplyCourseList />
    </Center>
  </>
);

export default Start;
