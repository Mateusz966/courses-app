import { useState, useEffect } from 'react';
import { CourseTableRes, CourseTableResContent } from '../../../app-types';
import { useApi } from '../../../hooks/useApi';

interface UseViewBoughtCourse {
  course: CourseTableResContent[];
  inProgress: boolean;
}

export const useViewBoughtCourses = (): UseViewBoughtCourse => {
  const { get, inProgress } = useApi();
  const [course, setCourses] = useState<CourseTableResContent[]>([]);

  const getCourses = async () => {
    const res = await get<CourseTableRes>('/course/bought');
    if (res) {
      setCourses(res.items);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);
  return { course, inProgress };
};
