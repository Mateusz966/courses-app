import { Center, Container } from '@chakra-ui/react';
import { Props } from 'framer-motion/types/types';
import React, { FC, useEffect, useState } from 'react';
import { CourseTableRes, CourseTableResContent } from '../../../app-types';
import { useApi } from '../../../hooks/useApi';
import SimplyCourseTile from './simplyCourseTile';

const SimplyCourseList: FC<Props> = () => {
  const [courses, setCourses] = useState<CourseTableResContent[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [totalNumberOfCourses, setTotalNumberOfCourses] = useState(0);
  const { get } = useApi();

  const getCourses = async () => {
    const res = await get<CourseTableRes>(
      `course/created/all?limit=10&offset=${offset}`,
    );
    if (res) {
      const newCourses = res.items;
      setCourses((prev) => [...prev, ...newCourses]);
      setTotalNumberOfCourses(res.countTotal);
    }
  };

  const handleScroll = () => {
    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setOffset((prev) => prev + 10);
      }
    };
  };

  useEffect(() => {
    if (offset === 0 && courses.length === 0) {
      handleScroll();
    }
    setLoading(true);
    getCourses();
    setLoading(false);
  }, [offset]);

  const coursesList = courses.map((course) => (
    <SimplyCourseTile course={course} />
  ));

  return (
    <Container>
      <Center>Liczba wszystkich kursów:{totalNumberOfCourses}</Center>
      {coursesList.length > 0 ? (
        coursesList
      ) : (
        <p>Nie makursów do wyświetlenia</p>
      )}
      {loading && <p>Loading ...</p>}
    </Container>
  );
};

export default SimplyCourseList;
