import { action, makeObservable, observable, runInAction } from 'mobx';
import {
  CategoryDto,
  CreateCourse,
  ICourse,
  CustomSelectOption,
} from '../app-types';

import { handlingError } from '../helpers/handleErrors';
import api from '../service/api';
import { SectionContentRes } from '../../../app-types';

type CourseContent = {
  lesson: { id: string; title: string; description: string; videoFn: string }[];
  sectionName: string;
  sectionDescription: string;
};

class Course {
  courseCategoryDetails: CreateCourse = {
    category: null,
    subcategory: null,
    topics: null,
  };

  course?: Omit<ICourse, 'content'>;

  courseContent = '';

  inProgress = false;

  courseSectionLesson: CourseContent = {
    sectionName: '',
    sectionDescription: '',
    lesson: [],
  };

  constructor() {
    makeObservable(this, {
      course: observable,
      courseContent: observable,
      courseCategoryDetails: observable,
      courseSectionLesson: observable,
      inProgress: observable,
      getCourseDetails: action,
      clearSectionLessons: action,
      setCategory: action,
      setSubcategory: action,
      setTopic: action,
      setContent: action,
      getSectionLessons: action,
    });
  }

  setCourse(course: Omit<ICourse, 'content'>) {
    this.course = course;
  }

  setContent(content: string) {
    this.courseContent = content;
  }

  setCategory(category: CustomSelectOption<CategoryDto> | null) {
    this.courseCategoryDetails.category = category;
  }

  setSubcategory(subcategory: CustomSelectOption<CategoryDto> | null) {
    this.courseCategoryDetails.subcategory = subcategory;
  }

  setTopic(topic: CustomSelectOption<CategoryDto>[] | null) {
    this.courseCategoryDetails.topics = topic;
  }

  clearSectionLessons() {
    this.courseSectionLesson = {
      sectionName: '',
      sectionDescription: '',
      lesson: [],
    };
  }

  async getSectionLessons(sectionId: string) {
    this.inProgress = true;
    const details = await api.get<SectionContentRes>(
      `/course/sections/${sectionId}/lessons`,
    );
    if (details) {
      runInAction(() => {
        this.inProgress = false;
        const {
          section: { title, description },
          ...rest
        } = details;
        this.courseSectionLesson = {
          sectionName: title,
          sectionDescription: description,
          ...rest,
        };
      });
    }
    this.inProgress = false;
  }

  async getCourseDetails(id: string) {
    this.inProgress = true;
    try {
      const details = await api.get<ICourse>(`/course/details/${id}`);
      if (details) {
        runInAction(() => {
          const { content, ...rest } = details;
          this.course = rest;
          this.courseContent = content;
          this.setCategory({
            value: rest.category,
            label: rest.category.name,
          });
          this.setSubcategory({
            value: rest.subcategory,
            label: rest.subcategory.name,
          });
          this.inProgress = false;
        });
      }
    } catch (error: any) {
      handlingError(error?.response);
      this.inProgress = false;
    }
  }
}

export const courseStore = new Course();
