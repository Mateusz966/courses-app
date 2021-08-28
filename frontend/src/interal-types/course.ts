import { UpdateCourseReq } from '../../../backend/app-types/course';

export type UpdateCourseForm = Omit<UpdateCourseReq, 'content'>;
