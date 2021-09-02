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
  description: string;
  videoFn: string;
  section: ISection;
}

export interface SectionContentRes {
  section: {
    id: string;
    title: string;
    description: string;
  },
  lessons: {
    id: string;
    title: string;
    description: string;
    videoFn: string;
  }
}

export interface ICourseTopics {
  topic: ITopic;
  course: ICourse;
}

export interface ISection {
  id: string;
  title: string;
  description: string;
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


export interface CourseContentReq {
  sectionName: string;
  sectionDescription: string;
  lesson: Omit<ILesson, 'videoFn'>[]
}

export interface CourseTableRes {
  items: CourseTableResContent[];
  countTotal: number;
}


export interface CourseTableResContent {
  title: string;
  id: string;
  courseStatus: CourseStatus;
}

interface CourseDetailsCommon {
  id: string;
  title: string;
  description: string;
  content: string;
  courseStatus: CourseStatus;
  courseFn: string;
  category: { name: string }
  subcategory: { name: string }
  user: {
    id: string;
    firstName: string;
    lastName: string;
    photoFn: string;
  }
}

export interface CourseDetailsRes extends CourseDetailsCommon{
 topics: {
   topic: {
     name: string;
   }
 }[]
}

export interface CourseDetails extends CourseDetailsCommon{}

export interface CourseSectionsRes {
  id: string
  title: string
  description: string
}
