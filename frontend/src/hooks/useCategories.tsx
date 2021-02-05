import { useEffect, useState } from 'react';
import { CategoryDto } from '../app-types/category';
import { BaseSelectOption } from '../app-types/global';
import { apiUrl } from '../config/apiUrl';
import api from '../service/api';

interface UseCategories {
  categories?: BaseSelectOption[] | null;
}

export const useCategories = (): UseCategories => {
  const [categories, setCategories] = useState<BaseSelectOption[] | null>(null);

  const getCategories = async () => {
    const categories = await api.get<CategoryDto[]>(`${apiUrl}/category/all`);

    if (categories) {
      setCategories(
        categories.map((cat: any) => ({
          value: cat.id,
          label: cat.name,
        }))
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
  };
};
