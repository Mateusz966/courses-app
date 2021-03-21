import { useCallback, useState } from 'react';
import { CategoryDto } from '../app-types/category';
import { BaseSelectOption, CustomSelectOption } from '../app-types/global';
import { errorNotification } from '../components/common/Toast';
import api from '../service/api';

interface UseCategories {
  getCategories: () => void;
  categories?: CustomSelectOption<CategoryDto>[] | null;
  getSubcategories: (categoryId?: string) => Promise<void | null>;
  subcategories: CustomSelectOption<CategoryDto>[] | null;
  topics: BaseSelectOption[] | null;
  getTopics: (categoryId: any, subcategoryId: any) => Promise<void | null>;
}

export const useCategories = (): UseCategories => {
  const [categories, setCategories] = useState<
    CustomSelectOption<CategoryDto>[] | null
  >(null);
  const [subcategories, setSubcategories] = useState<
    CustomSelectOption<CategoryDto>[] | null
  >(null);
  const [topics, setTopics] = useState<BaseSelectOption[] | null>(null);

  const getCategories = useCallback(async () => {
    const categories = await api.get<CategoryDto[]>(`/category/all`);

    if (categories) {
      setCategories(
        categories.map((cat) => ({
          value: cat,
          label: cat.name,
        }))
      );
    }
  }, []);

  const getSubcategories = useCallback(async (categoryId?: string) => {
    if (!categoryId) {
      errorNotification('Category not given');
      return null;
    }

    const res = await api.get<CategoryDto[]>(
      `/category/subcategory/${categoryId}`
    );

    if (res) {
      setSubcategories(
        res.map((cat) => ({
          value: cat,
          label: cat.name,
        }))
      );
    }
  }, []);

  const getTopics = useCallback(async (categoryId: any, subcategoryId: any) => {
    const res = await api.get<CustomSelectOption<CategoryDto>[]>(
      `/category/subcategory/${categoryId}/${subcategoryId}`
    );

    if (res) {
      setTopics(
        res.map((cat: any) => ({
          value: cat.id,
          label: cat.name,
        }))
      );
    }
  }, []);

  return {
    categories,
    getCategories,
    getSubcategories,
    subcategories,
    topics,
    getTopics,
  };
};
