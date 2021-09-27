import { action, makeObservable, observable } from 'mobx';

type FilterType = 'category' | 'subcategory' | 'topics';

type CourseFilters = {
  [index in FilterType]: string[];
} & {
  category: string[];
  subcategory: string[];
  topics: string[];
};

type ManipulateFilter = {
  id: string;
  type: FilterType;
};

export class CourseClientsStore {
  filters: CourseFilters = {
    category: [],
    subcategory: [],
    topics: [],
  };

  constructor() {
    makeObservable(this, {
      filters: observable,
      setFilter: action,
      removeFilter: action,
    });
  }

  setFilter({ id, type }: ManipulateFilter): void {
    this.filters[type].push(id);
  }

  removeFilter({ id, type }: ManipulateFilter): void {
    const filtered = this.filters[type].filter((filter) => filter !== id);
    this.filters[type] = filtered;
  }
}
