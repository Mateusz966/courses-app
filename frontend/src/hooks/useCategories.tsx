import { useEffect, useState } from 'react';
import { CategoryDto } from '../app-types/category';
import { BaseSelectOption, CustomSelectOption } from '../app-types/global';
import { apiUrl } from '../config/apiUrl';
import api from '../service/api';

interface UseCategories {
  categories?: BaseSelectOption[] | null;
  getSubcategories: (
    categoryId: string
  ) => Promise<void | CustomSelectOption<CategoryDto>[]>;
}

export const useCategories = (): UseCategories => {
  const [categories, setCategories] = useState<BaseSelectOption[] | null>(null);
  const [subcategories, setSubcategories] = useState<BaseSelectOption[] | null>(
    null
  );

  const getCategories = async () => {
    const categories = await api.get<CategoryDto[]>(`/category/all`);

    if (categories) {
      setCategories(
        categories.map((cat: any) => ({
          value: cat.id,
          label: cat.name,
        }))
      );
    }
  };

  const getSubcategories = async (categoryId: string) => {
    return await api.get<CustomSelectOption<CategoryDto>[]>(
      `/category/subcategory/${categoryId}`
    );
  };

  const getTopics = async (categoryId: any, subcategoryId: any) => {
    return await api.get<CustomSelectOption<CategoryDto>[]>(
      `/category/subcategory/${categoryId}/${subcategoryId}`
    );
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
    getSubcategories,
  };
};
