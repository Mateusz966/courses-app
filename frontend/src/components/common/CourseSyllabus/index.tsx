import { Accordion, Box, Heading } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { CourseDetailsRes } from '../../../app-types';
import { useApi } from '../../../hooks/useApi';
import CourseSyllabusContent from './courseSyllabusContent';

export const CourseSyllabus: FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { get } = useApi();
  // const { getSyllabusContent, setSyllabusContent } = useState<
  //   CourseDetailsRes[]
  // >([]);

  const getSyllabusContent = async () => {
    const res = await get<CourseDetailsRes>(`/sections/${courseId}`);
    if (res) {
      // console.log(res);
    }
  };

  useEffect(() => {
    // console.log(courseId);
    getSyllabusContent();
  }, []);

  return (
    <Box>
      <Heading as="h2" size="lg" mb="7">
        Program kursu
      </Heading>
      <Accordion allowMultiple>
        <CourseSyllabusContent />
      </Accordion>
    </Box>
  );
};
