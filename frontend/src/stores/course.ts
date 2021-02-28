import { action, makeObservable, observable, runInAction } from 'mobx';
import { CategoryDto, CreateCourse } from '../app-types/category';
import { ICourse } from '../app-types/course';
import { CustomSelectOption } from '../app-types/global';
import { handlingError } from '../helpers/handleErrors';
import api from '../service/api';

class Course {
  createCourse: CreateCourse = {
    category: null,
    subcategory: null,
    topics: null,
  };
  course?: Omit<ICourse, 'content'>;
  courseContent: string = '';
  inProgress = false;

  constructor() {
    makeObservable(this, {
      course: observable,
      courseContent: observable,
      createCourse: observable,
      inProgress: observable,
      getCourseDetails: action,
      setCategory: action,
      setSubcategory: action,
      setTopic: action,
      setContent: action,
    });
  }

  setCourse(course: Omit<ICourse, 'content'>) {
    this.course = course;
  }

  setContent(content: string) {
    this.courseContent = content;
  }

  setCategory(category: CustomSelectOption<CategoryDto> | null) {
    this.createCourse.category = category;
  }

  setSubcategory(subcategory: CustomSelectOption<CategoryDto>| null) {
    this.createCourse.subcategory = subcategory;
  }

  setTopic(topic: CustomSelectOption<CategoryDto>[]| null) {
    this.createCourse.topics = topic;
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
          this.inProgress = false;
        });
      }
    } catch (error) {
      handlingError(error.response);
      this.inProgress = false;
    }
  }
}

export const courseStore = new Course();
