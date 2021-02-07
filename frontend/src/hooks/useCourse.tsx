
import api from '../service/api';
import { history } from '../config/history';
import { handlingError } from '../helpers/handleErrors';
import { courseStore } from '../stores/course';
import { CustomSelectOption } from '../app-types/global';
import { CategoryDto, CreateCourse } from '../app-types/category';

interface UseCourse {
  createCourse: (payload: CreateCourse) => void;
  submitCategory: (payload: CustomSelectOption<CategoryDto>) => void;
  submitSubcategory: (payload: CustomSelectOption<CategoryDto>) => void;
}

export const useCourse = (): UseCourse => {
  const submitCategory = async (payload: CustomSelectOption<CategoryDto>) => {
    courseStore.setCategory(payload);
    history.push('/dashboard/course/add/subcategory')
  }

  const submitSubcategory = async (payload: CustomSelectOption<CategoryDto>) => {
    courseStore.setSubcategory(payload);
    history.push('/dashboard/course/add/category')
  }

  const createCourse = async (payload: CreateCourse) => {
    try {
      const courseId = await api.post<string, CreateCourse>('/course/add', payload);
      if (courseId) {
        history.push(`/dashboard/course/edit/${courseId}`);
      }
    } catch (error) {
      
    }
  }

  return {
    createCourse,
    submitCategory, 
    submitSubcategory,
  };
};
