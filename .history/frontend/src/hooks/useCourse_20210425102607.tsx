import api from '../service/api';
import { history } from '../config/history';
import { courseStore } from '../stores/course';
import { CategoryDto, CreateCourse } from '../app-types/category';
import { CustomSelectOption } from '../../../app-types/global';
import { useCallback } from 'react';
import { useRootStore } from '../stores/storeContext';
import { useApi } from './useApi';
import { SetError } from '../app-types/global';

interface Props {
  setError: SetError;
}

interface UseCourse {
  submitCategory: (
    payload: {
      category: CustomSelectOption<CategoryDto>;
    },
    courseId?: string
  ) => void;
  submitSubcategory: (
    payload: {
      subcategory: CustomSelectOption<CategoryDto>;
    },
    courseId?: string
  ) => void;
  createCourse: (
    payload: {
      topics: CustomSelectOption<CategoryDto>[];
    },
    courseId?: string
  ) => void;
  handleEditorChange: (content: any) => void;
  publish: (courseId: string) => Promise<void>;
  updateCourse: any;
  inProgress: boolean;
}

export const useCourse = (props?: Props): UseCourse => {
  const { fileStore } = useRootStore();
  const { inProgress, post } = useApi({ setError: props?.setError });

  const publish = async (courseId: string) => {
    await post(`/course/publish/${courseId}`);
  };

  const handleEditorChange = useCallback((content) => {
    courseStore.setContent(content);
  }, []);

  const submitCategory = async (
    payload: {
      category: CustomSelectOption<CategoryDto>;
    },
    courseId?: string
  ) => {
    const url = courseId
      ? `/dashboard/course/edit/details/${courseId}/subcategory`
      : '/dashboard/course/add/subcategory';
    courseStore.setCategory(payload.category);
    history.push(url);
  };

  const submitSubcategory = async (
    payload: {
      subcategory: CustomSelectOption<CategoryDto>;
    },
    courseId?: string
  ) => {
    const url = courseId
      ? `/dashboard/course/edit/details/${courseId}/topics`
      : `/dashboard/course/add/topics`;
    courseStore.setSubcategory(payload.subcategory);
    history.push(url);
  };

  const createCourse = async (
    payload: {
      topics: CustomSelectOption<CategoryDto>[];
    },
    courseId?: string
  ) => {
    let savedCourseId;
    courseStore.setTopic(payload.topics);
    if (courseId) {
      savedCourseId = await api.post<string, CreateCourse>(
        '/course/edit',
        courseStore.courseCategoryDetails
      );
    } else {
      savedCourseId = await api.post<string, CreateCourse>(
        '/course/add',
        courseStore.courseCategoryDetails
      );
    }
    history.push(`/dashboard/course/edit/${savedCourseId}`);
  };

  const updateCourse = async (payload: any, content: any, courseId: string) => {
    const fd = new FormData();

    fd.append('body', JSON.stringify({ ...payload, content }));

    if (fileStore.files) {
      fileStore.files.forEach((file) => {
        fd.append(file?.name, file?.file, file?.name);
      });
    }
    console.log(courseId);

    // await post(`/course/update/${courseId}`, fd);
    fileStore.removeAllFiles();
  };

  return {
    createCourse,
    submitCategory,
    submitSubcategory,
    updateCourse,
    handleEditorChange,
    inProgress,
    publish,
  };
};
