import { UpdateCourseReq } from '../../../app-types';
import { ILesson } from '../app-types';

export type UpdateCourseForm = UpdateCourseReq;

export type FormLesson = Omit<ILesson, 'id'> & { fId: string };

export interface CourseContentForm {
  sectionName: string;
  sectionDescription: string;
  lesson: FormLesson[];
}
