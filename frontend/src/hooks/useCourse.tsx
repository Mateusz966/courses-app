import api from '../service/api';
import { history } from '../config/history';
import { courseStore } from '../stores/course';
import { CategoryDto, CreateCourse } from '../app-types/category';
import { BaseSelectOption } from '../../../app-types/global';

interface UseCourse {
  submitCategory: (payload: { category: BaseSelectOption }) => void;
  submitSubcategory: (payload: { subcategory: BaseSelectOption }) => void;
  createCourse: (payload: { topics: BaseSelectOption[] }) => void;
}

export const useCourse = (): UseCourse => {
  const submitCategory = async (payload: { category: BaseSelectOption }) => {
    courseStore.setCategory(payload.category);
    history.push('/dashboard/course/add/subcategory');
  };

  const submitSubcategory = async (payload: {
    subcategory: BaseSelectOption;
  }) => {
    courseStore.setSubcategory(payload.subcategory);
    history.push('/dashboard/course/add/topics');
  };

  const createCourse = async (payload: { topics: BaseSelectOption[] }) => {
    courseStore.setTopic(payload.topics);
    const courseId = await api.post<string, CreateCourse>(
      '/course/add',
      courseStore.createCourse
    );
    history.push(`/dashboard/course/edit/${courseId}`);
  };

  return {
    createCourse,
    submitCategory,
    submitSubcategory,
  };
};
