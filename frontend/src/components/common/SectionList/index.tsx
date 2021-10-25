import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
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

  useEffect(() => {
    getSectionList();
  }, []);

  return (
    <>
      <Heading as="h2" size="md" mb="2">
        Sekcje kursu
      </Heading>
      <Box as="ul" listStyleType="none">
        {!!sections?.length &&
          sections.map(({ title, id, description }) => (
            <Box
              onClick={() => courseStore.getSectionLessons(id)}
              key={id}
              as="li"
              pt="0.5"
              pb="0.5"
            >
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
