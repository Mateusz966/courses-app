import { ITopic, CourseStatus, ICategory, ISubcategory } from './category';
import { IUser } from './user';
import { Currency } from './global';

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
  price: number;
  currency: Currency;
  courseFn: string;
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
  };
  lesson: {
    id: string;
    title: string;
    description: string;
    videoFn: string;
  }[];
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
  price: number;
}

export interface PublishCourseReq {
  title: string;
  description: string;
  content: string;
}

export interface CourseContentReq {
  sectionName: string;
  sectionDescription: string;
  lesson: Omit<ILesson, 'videoFn'>[];
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
  category: { name: string };
  subcategory: { name: string };
  user: {
    id: string;
    firstName: string;
    lastName: string;
    photoFn: string;
  };
  section: Section[];
  price: number;
  currency: Currency;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  lesson: [
    {
      id: string;
      title: string;
      description: string;
    },
  ];
}

export type CourseAuthor = Pick<CourseDetailsCommon, 'user'>;

export interface CourseDetailsRes extends CourseDetailsCommon {
  topics: {
    name: string;
    id: string;
  }[];
}

export type CourseDetails = CourseDetailsCommon;

export interface CourseSectionsRes {
  id: string;
  title: string;
  description: string;
}

export interface ShoppingCart {
  course: SetCourseInCart[];
}

export interface SetCourseInCart {
  id: string;
  title: string;
  price: number;
  currency: Currency;
}

export interface PublishedCourseRes {
  courseStatus: CourseStatus;
  id: string;
  price: number;
  currency: Currency;
  title: string;
  user: { firstName: string; lastName: string };
  firstName: string;
  lastName: string;
}

export interface BuyCoursesReq {
  courses: SetCourseInCart[];
  totalPrice: number;
  currency: Currency;
}
export interface BoughtCoursesReq {
  courses: SetCourseInCart[];
  totalPrice: number;
  currency: Currency;
  paymentStatus: string;
}
