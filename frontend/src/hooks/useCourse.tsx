import { UserLogin } from '../app-types/user';
import { useState } from 'react';
import api from '../service/api';
import { history } from '../config/history';
import { handlingError } from '../helpers/handleErrors';

interface UseCourse {
  createCourse: any;
}

export const useCourse = (): UseCourse => {
  const createCourse = async () => {
    try {
      const id = await api.post('/course/add', null);
      history.push(`/dashboard/course/edit/${id}`);
    } catch (error) {
      handlingError(error.response);
    }
  };

  return {
    createCourse,
  };
};
