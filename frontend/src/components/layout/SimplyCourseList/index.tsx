import { Center, Container } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { CourseTableRes, CourseTableResContent } from '../../../app-types';
import { useApi } from '../../../hooks/useApi';
import SimplyCourseTile from './simplyCourseTile';

const SimplyCourseList: FC = () => {
  const [courses, setCourses] = useState<CourseTableResContent[]>([]);
  const [offset, setOffset] = useState(0);
  const [totalNumberOfCourses, setTotalNumberOfCourses] = useState(0);
  const [iniFetch, setIniFetch] = useState(true);
  const { get, inProgress } = useApi();

  const getCourses = async () => {
    const res = await get<CourseTableRes>(
      `course/created/all?limit=10&offset=${offset}`,
    );
    if (res) {
      const newCourses = res.items;
      setCourses((prev) => [...prev, ...newCourses]);
      setTotalNumberOfCourses(res.countTotal);
      setIniFetch(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (courses.length < totalNumberOfCourses) {
        setOffset((prev) => prev + 10);
      }
    }
  };

  useEffect(() => {
    getCourses();
  }, [offset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [courses, totalNumberOfCourses]);

  const coursesList = courses.map((course) => (
    <SimplyCourseTile key={course.id} course={course} />
  ));

  if (inProgress && iniFetch) {
    return <p>Loading ...</p>;
  }

  return (
    <Container>
      <Center>Liczba wszystkich kursów:{totalNumberOfCourses}</Center>
      {coursesList.length > 0 ? (
        coursesList
      ) : (
        <p>Nie makursów do wyświetlenia</p>
      )}
      <Center>{inProgress && !iniFetch && <p>Loading ...</p>}</Center>
    </Container>
  );
};

export default SimplyCourseList;
