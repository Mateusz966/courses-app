import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { courseStore } from '../../../stores/course';
import { Button } from '../Button';

export const SectionList = observer(() => {
  const { courseId } = useParams<{ courseId: string }>();

  const handleClick = (id: string) => {
    courseStore.getSectionLessons(id);
    courseStore.setCurrentSection(id);
  };

  useEffect(() => {
    courseStore.getSectionList(courseId);
  }, []);

  return (
    <>
      Course sections
      <Box as="ul">
        {!!courseStore.sections?.length &&
          courseStore.sections.map(({ title, id, description }) => (
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
});
