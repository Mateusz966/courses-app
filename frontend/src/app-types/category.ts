import { BaseSelectOption } from "./global";

export interface CategoryDto {
  id: string;
  name: string;
}

export type CreateCourse = {
  category: BaseSelectOption | null;
  subcategory: BaseSelectOption | null;
  topics: BaseSelectOption[] | null;
};

