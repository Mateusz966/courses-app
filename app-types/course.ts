import { ITopic, CourseStatus, ICategory, ISubcategory } from './category';
import { IUser } from './user';

export interface ICourse {
  id: string;
  title: string;
  description: string;
  content: string;
  courseStatus: CourseStatus;
  courseTopics: ICourseTopics[];
  section: ISection;
  user: IUser;
  category: ICategory;
  subcategory: ISubcategory;
}

export interface ILesson {
  id: string;
  title: string;
  videoFn: string;
  section: ISection;
}

export interface ICourseTopics {
  topic: ITopic;
  course: ICourse;
}

export interface ISection {
  id: string;
  title: string;
  lesson: ILesson;
  course: ICourse;
}

export interface UpdateCourseReq {
  title: string;
  description: string;
  content: string;
}

export interface PublishCourseReq {
  title: string;
  description: string;
  content: string;
}