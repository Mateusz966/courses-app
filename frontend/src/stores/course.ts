import { action, makeObservable, observable, runInAction } from 'mobx';
import { handlingError } from '../helpers/handleErrors';
import api from '../service/api';

export class Course {
  course: any = {};
  inProgress = false;

  constructor() {
    makeObservable(this, {
      course: observable,
      inProgress: observable,
      getCourseDetails: action,
    });
  }

  setCourse(course: any) {
    this.course = course;
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
