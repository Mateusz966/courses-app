import { action, makeObservable, observable, runInAction } from 'mobx';
import api from '../service/api';
import { CourseTableRes, CourseTableResContent } from '../app-types';
import { handlingError } from '../helpers/handleErrors';

type FilterType = 'categories' | 'subcategories' | 'topics';

type CourseFilters = {
  [index in FilterType]: string[];
} & {
  categories: string[];
  subcategories: string[];
  topics: string[];
};

type ManipulateFilter = {
  id: string;
  type: FilterType;
};

export class CourseClientsStore {
  filters: CourseFilters = {
    categories: [],
    subcategories: [],
    topics: [],
  };

  filterList = undefined;

  offset = 0;

  limit = 10;

  totalNumberOfCourses = 0;

  inProgress = false;

  initFetch = true;

  courses: CourseTableResContent[] = [];

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

  setOffset() {
    this.offset += 10;
  }

  setNumberOfCourses(total: number) {
    this.totalNumberOfCourses = total;
  }

  setInitFetch() {
    this.initFetch = false;
  }

  async getCourses() {
    console.log('XDD');
    this.inProgress = true;
    try {
      const res = await api.get<CourseTableRes>(
        `course/created/all?limit=10&offset=${this.offset}&${
          this.filters ?? ''
        }`,
      );
      if (res) {
        runInAction(() => {
          this.courses = [...this.courses, ...res.items];
          this.setInitFetch();
          this.setNumberOfCourses(res.countTotal);
        });
      }
    } catch (error) {
      handlingError(error.response);
      this.inProgress = false;
    }
  }

  async getFiltersList() {
    const res = await api.get<any>('/category/filters');

    if (res) {
      this.filterList = res;
    }
  }
}

export const courseClientsStore = new CourseClientsStore();
