import { useEffect, useState } from "react"
import { map } from "rxjs/operators";
import { BaseSelectOption } from "../../../types/global";
import { CategoryDto } from "../../../types/category";
import { apiUrl } from "../config/apiUrl";
import api from "../service/api";

interface UseCategories {
  categories?: BaseSelectOption[] | null;
}

export const useCategories = (): UseCategories => {
  const [categories, setCategories] = useState<BaseSelectOption[]>();

  const getCategories = () => {
    api
      .get<CategoryDto[]>(`${apiUrl}/category/all`)
      .pipe(
        map((category) => {
          return category.map<any>((cat) => ({
            value: cat.id,
            label: cat.name
          }) as BaseSelectOption)
        })
      ).subscribe((res: BaseSelectOption[]) => {
        setCategories(res);
      });
  }


  useEffect(() => {
    getCategories()
  }, [])

return {
  categories
};
}