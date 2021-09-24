import { useEffect, useState } from 'react';
import { CourseTableRes, CourseTableResContent } from '../../app-types';
import { useApi } from '../useApi';

interface UseCourseClient {
  courses: CourseTableResContent[];
  initFetch: boolean;
  inProgress: boolean;
  totalNumberOfCourses: number;
}

export const useCourseClient = (): UseCourseClient => {
  const [courses, setCourses] = useState<CourseTableResContent[]>([]);
  const [offset, setOffset] = useState(0);
  const [totalNumberOfCourses, setTotalNumberOfCourses] = useState(0);
  const [initFetch, setInitFetch] = useState(true);
  const { get, inProgress } = useApi();

  const getCourses = async () => {
    const res = await get<CourseTableRes>(
      `course/created/all?limit=10&offset=${offset}`,
    );
    if (res) {
      const newCourses = res.items;
      setCourses((prev) => [...prev, ...newCourses]);
      setTotalNumberOfCourses(res.countTotal);
      setInitFetch(false);
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

  return {
    courses,
    initFetch,
    inProgress,
    totalNumberOfCourses,
  };
};
