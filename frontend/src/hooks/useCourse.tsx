import api from '../service/api';
import { history } from '../config/history';
import { courseStore } from '../stores/course';
import { CategoryDto, CreateCourse } from '../app-types/category';
import { CustomSelectOption } from '../../../app-types/global';
import { useState } from 'react';

interface UseCourse {
  submitCategory: (payload: {
    category: CustomSelectOption<CategoryDto>;
  }) => void;
  submitSubcategory: (payload: {
    subcategory: CustomSelectOption<CategoryDto>;
  }) => void;
  createCourse: (payload: {
    topics: CustomSelectOption<CategoryDto>[];
  }) => void;
  updateCourse: any;
  inProgress: boolean;
}

export const useCourse = (): UseCourse => {

  const [inProgress, setInProgress] = useState(false);

  const submitCategory = async (payload: {
    category: CustomSelectOption<CategoryDto>;
  }) => {
    courseStore.setCategory(payload.category);
    history.push('/dashboard/course/add/subcategory');
  };

  const submitSubcategory = async (payload: {
    subcategory: CustomSelectOption<CategoryDto>;
  }) => {
    courseStore.setSubcategory(payload.subcategory);
    history.push('/dashboard/course/add/topics');
  };

  const createCourse = async (payload: {
    topics: CustomSelectOption<CategoryDto>[];
  }) => {
    courseStore.setTopic(payload.topics);
    const courseId = await api.post<string, CreateCourse>(
      '/course/add',
      courseStore.createCourse
    );
    history.push(`/dashboard/course/edit/${courseId}`);
  };

  const updateCourse = async (payload: any, setError: any, courseId: string) => {
    await api.post(`/course/update/${courseId}`, payload, setError, setInProgress);
  }

  return {
    createCourse,
    submitCategory,
    submitSubcategory,
    updateCourse,
    inProgress
  };
};
