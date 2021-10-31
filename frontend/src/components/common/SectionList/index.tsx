import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useApi } from '../../../hooks/useApi';
import { CourseSectionsRes } from '../../../app-types';
import { courseStore } from '../../../stores/course';
import { Button } from '../Button';

export const SectionList = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [sections, setSections] = useState<CourseSectionsRes[]>();
  const { get } = useApi();

  const getSectionList = async () => {
    const res = await get<CourseSectionsRes[]>(`/course/sections/${courseId}`);
    if (res) {
      setSections(res);
    }
  };

  const handleClick = (id: string) => {
    courseStore.getSectionLessons(id);
    courseStore.setCurrentSection(id);
  };

  useEffect(() => {
    getSectionList();
  }, []);

  return (
    <>
      Course sections
      <Box as="ul">
        {!!sections?.length &&
          sections.map(({ title, id, description }) => (
            <Box onClick={() => handleClick(id)} key={id} as="li">
              {title}
            </Box>
          ))}
      </Box>
      <Button onClick={() => courseStore.clearSectionLessons()}>
        Add section
      </Button>
    </>
  );
};
