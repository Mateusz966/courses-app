import { BaseSelectOption, CustomSelectOption } from "./global";

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
