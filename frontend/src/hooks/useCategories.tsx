import { useCallback, useState } from 'react';
import { CategoryDto } from '../app-types/category';
import { BaseSelectOption, CustomSelectOption } from '../app-types/global';
import { errorNotification } from '../components/common/Toast';
import { useApi } from './useApi';

interface UseCategories {
  getCategories: () => void;
  categories?: CustomSelectOption<CategoryDto>[] | null;
  getSubcategories: (categoryId?: string) => Promise<void | null>;
  subcategories: CustomSelectOption<CategoryDto>[] | null;
  topics: BaseSelectOption[] | null;
  getTopics: (
    categoryId: string,
    subcategoryId: string,
  ) => Promise<void | null>;
}

export const useCategories = (): UseCategories => {
  const [categories, setCategories] = useState<
    CustomSelectOption<CategoryDto>[] | null
  >(null);
  const [subcategories, setSubcategories] = useState<
    CustomSelectOption<CategoryDto>[] | null
  >(null);
  const [topics, setTopics] = useState<BaseSelectOption[] | null>(null);
  const { get } = useApi();

  const getCategories = useCallback(async () => {
    const allCategories = await get<CategoryDto[]>('/category/all');

    if (allCategories) {
      setCategories(
        allCategories.map((cat) => ({
          value: cat,
          label: cat.name,
        })),
      );
    }
  }, [get]);

  const getSubcategories = useCallback(
    async (categoryId?: string) => {
      if (!categoryId) {
        errorNotification('Category not given');
        return;
      }

      const res = await get<CategoryDto[]>(
        `/category/subcategory/${categoryId}`,
      );

      if (res) {
        setSubcategories(
          res.map((cat) => ({
            value: cat,
            label: cat.name,
          })),
        );
      }
    },
    [get],
  );

  const getTopics = useCallback(
    async (categoryId: string, subcategoryId: string) => {
      const res = await get<CategoryDto[]>(
        `/category/subcategory/${categoryId}/${subcategoryId}`,
      );

      if (res) {
        setTopics(
          res.map((topic) => ({
            value: topic.id,
            label: topic.name,
          })),
        );
      }
    },
    [get],
  );

  return {
    categories,
    getCategories,
    getSubcategories,
    subcategories,
    topics,
    getTopics,
  };
};
