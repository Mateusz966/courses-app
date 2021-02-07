export interface CategoryDto {
  id: string;
  name: string;
}

export type CreateCourse = {
  category: CategoryDto | null;
  subcategory: CategoryDto | null;
  topics: CategoryDto[] | null;
};
