import { CustomSelectOption } from "./global";

export interface CategoryDto {
  id: string;
  name: string;
}

export type CreateCourse = {
  category: CustomSelectOption<CategoryDto> | null;
  subcategory: CustomSelectOption<CategoryDto> | null;
  topics: CustomSelectOption<CategoryDto>[] | null;
};
