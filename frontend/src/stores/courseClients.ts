import { action, makeObservable, observable, runInAction } from 'mobx';
import api from '../service/api';
import { ApiTableRes, PublishedCourseRes } from '../app-types';
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

  filterList: any = undefined;

  offset = 0;

  limit = 10;

  totalNumberOfCourses = 0;

  inProgress = false;

  initFetch = true;

  courses: PublishedCourseRes[] = [];

  constructor() {
    makeObservable(this, {
      courses: observable,
      initFetch: observable,
      inProgress: observable,
      filters: observable,
      offset: observable,
      totalNumberOfCourses: observable,
      toggleFilter: action.bound,
      clearCourses: action,
      setOffset: action,
      getCourses: action.bound,
    });
  }

  toggleFilter({ id, type }: ManipulateFilter): void {
    const searchedFilterId = this.filters[type].find(
      (filterId) => filterId === id,
    );
    if (searchedFilterId) {
      const filteredFilters = this.filters[type].filter(
        (filterId) => filterId !== id,
      );
      this.filters[type] = filteredFilters;
    } else {
      this.filters[type].push(id);
    }
    this.clearCourses();
    this.getCourses();
  }

  clearCourses() {
    this.courses = [];
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
    this.inProgress = true;
    try {
      const res = await api.get<ApiTableRes<PublishedCourseRes[]>>(
        `course/published?limit=10&offset=${this.offset}&${
          new URLSearchParams(this.filters as any).toString() ?? ''
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
    } finally {
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
