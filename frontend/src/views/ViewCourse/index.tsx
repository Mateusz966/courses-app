import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { TopNavBar } from '../../components/common/TopNavbar';
import { ViewCourseWrapper } from '../../components/common/ViewCourseWrapper';

const ViewCourse: FC = () => {
  return (
    <Box>
      <TopNavBar />
      <ViewCourseWrapper />
    </Box>
  );
};

export default ViewCourse;
