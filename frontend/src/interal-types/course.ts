import { UpdateCourseReq } from '../../../app-types';

export type UpdateCourseForm = Omit<UpdateCourseReq, 'content'>;
