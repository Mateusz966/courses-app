import { useCallback } from 'react';
import { history } from '../../config/history';
import { courseStore } from '../../stores/course';
import { CategoryDto, CreateCourse } from '../../app-types';
import { CustomSelectOption } from '../../../../app-types';
import { useRootStore } from '../../stores/storeContext';
import { useApi } from '../useApi';
import { SetError } from '../../types/global';
import { UpdateCourseForm } from '../../interal-types';

interface Props {
  setError: SetError;
  getValues?: any;
}

interface UseCourse {
  submitCategory: (
    payload: {
      category: CustomSelectOption<CategoryDto>;
    },
    courseId?: string,
  ) => void;
  submitSubcategory: (
    payload: {
      subcategory: CustomSelectOption<CategoryDto>;
    },
    courseId?: string,
  ) => void;
  handleCourseDetailsSubmit: (
    payload: {
      topics: CustomSelectOption<CategoryDto>[];
    },
    courseId?: string,
  ) => void;
  updateCourse: (payload: UpdateCourseForm, courseId: string) => Promise<void>;
  handleUpdateCourse: (id: string) => Promise<void>;
  publish: (courseId: string) => Promise<void>;
  inProgress: boolean;
}

export const useCourse = (props?: Props): UseCourse => {
  const { fileStore } = useRootStore();
  const { inProgress, post, put } = useApi({ setError: props?.setError });

  const publish = async (courseId: string) => {
    await post(`/course/publish/${courseId}`);
  };

  const submitCategory = async (
    payload: {
      category: CustomSelectOption<CategoryDto>;
    },
    courseId?: string,
  ) => {
    console.log(payload);
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
    courseId?: string,
  ) => {
    const url = courseId
      ? `/dashboard/course/edit/details/${courseId}/topics`
      : '/dashboard/course/add/topics';
    courseStore.setSubcategory(payload.subcategory);
    history.push(url);
  };

  const courseDetailsEdit = async (courseId: string) =>
    put<string, CreateCourse>(
      `/course/edit/${courseId}`,
      courseStore.courseCategoryDetails,
    );

  const courseDetailsCreate = async () =>
    post<string, CreateCourse>(
      '/course/add',
      courseStore.courseCategoryDetails,
    );

  const handleCourseDetailsSubmit = async (
    payload: {
      topics: CustomSelectOption<CategoryDto>[];
    },
    courseId?: string,
  ) => {
    let savedCourseId;
    courseStore.setTopic(payload.topics);
    if (courseId) {
      savedCourseId = await courseDetailsEdit(courseId);
    } else {
      savedCourseId = await courseDetailsCreate();
    }
    if (savedCourseId) {
      history.push(`/dashboard/course/edit/${savedCourseId}`);
    }
  };

  const updateCourse = useCallback(
    async (payload: UpdateCourseForm, courseId: string) => {
      payload.price = Number(payload.price);
      const fd = new FormData();
      fd.append('body', JSON.stringify(payload));

      if (fileStore.files) {
        fileStore.files.forEach((file) => {
          fd.append(file?.name, file?.file, file?.name);
        });
      }

      await post(`/course/update/${courseId}`, fd);
      fileStore.removeAllFiles();
    },
    [],
  );

  const handleUpdateCourse = async (id: string) => {
    const { title, description, price, content } = props?.getValues();
    if (title && description && price && content) {
      await updateCourse(
        {
          title,
          description,
          price,
          content,
        },
        id,
      );
    }
  };

  return {
    handleCourseDetailsSubmit,
    submitCategory,
    submitSubcategory,
    updateCourse,
    handleUpdateCourse,
    inProgress,
    publish,
  };
};
