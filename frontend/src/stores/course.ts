import { action, makeObservable, observable, runInAction } from 'mobx';
import { CreateCourse } from '../app-types/category';
import { handlingError } from '../helpers/handleErrors';
import api from '../service/api';



class Course {
  createCourse: CreateCourse = {
    category: null,
    subcategory: null,
    topics: null,
  };
  course: any = {};
  inProgress = false;

  constructor() {
    makeObservable(this, {
      course: observable,
      createCourse: observable,
      inProgress: observable,
      getCourseDetails: action,
      setCategory: action,
      setSubcategory: action,
      setTopic: action,
    });
  }

  setCourse(course: any) {
    this.course = course;
  }

  setCategory(category: any) {
    this.createCourse.category = category;
  }

  setSubcategory(subcategory: any) {
    this.createCourse.subcategory = subcategory;
  }

  setTopic(topic: any) {
    this.createCourse.topics = topic;
  }

  async getCourseDetails(id: string) {
    this.course = {};
    this.inProgress = true;
    try {
      const details = await api.get(`/course/details/${id}`);
      if (details) {
        runInAction(() => {
          this.course = details;
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
