/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';
import { useApi } from './useApi';
import { CourseTableRes, CourseTableResContent } from '../app-types';

interface UseCoursesByCategory {
  inProgress: boolean;
  courses: CourseTableResContent[];
}

interface Props {
  categories?: string;
  subcategory?: string;
}

export const useCourseByCategory = ({
  categories,
  subcategory,
}: Props): UseCoursesByCategory => {
  const [courses, setCourses] = useState<CourseTableResContent[]>([]);
  const { inProgress, get } = useApi();

  const getCourses = async () => {
    const res = await get<CourseTableRes>(
      `course/published?limit=10&offset=0&${new URLSearchParams({
        categories: categories ?? '',
        subcategory: subcategory ?? '',
      }).toString()}`,
    );

    if (res) {
      setCourses(res.items);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return {
    courses,
    inProgress,
  };
};
