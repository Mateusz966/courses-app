import { ICourse } from "./course";
import { CustomSelectOption } from "./global";
import { IUser } from "./user";

export interface ISubcategory {
  id: string;
  name: string;
  category: ICategory;
  topic: ITopic;
  course: ICourse;
}
export interface ITopic {
  id: string;
  name: string;
  userCategories: IUserCategories;
  course: ICourse;
  topic: ITopic;
  subcategory: ISubcategory;
}

export interface ICategory {
  id: string;
  name: string;
  userCategories: IUserCategories;
  course: ICourse;
  topic: ITopic;
  subcategory: ISubcategory;
}

export interface IUserCategories {
  user: IUser; 
  category: ICategory;
}

export interface CategoryDto {
  id: string;
  name: string;
}

export type CreateCourse = {
  category: CustomSelectOption<CategoryDto> | null;
  subcategory: CustomSelectOption<CategoryDto> | null;
  topics: CustomSelectOption<CategoryDto>[] | null;
};

export enum CourseStatus {
  Draft,
  Published,
  Removed,
}

export interface UpdateCourseReq {
  description: string;
  title: string;
}
