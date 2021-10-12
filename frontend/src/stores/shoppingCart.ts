import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '.';
import { Course, ShoppingCart } from '../app-types';

export class ShoppingCartStore {
  root: RootStore;

  cartPayload: ShoppingCart = {
    course: [],
  };

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      cartPayload: observable,
      addToCart: action.bound,
      deleteCourseFromCart: action.bound,
    });
  }

  addToCart(course: Course) {
    const foundCourse = this.cartPayload.course.find(
      (courseInCart) => courseInCart.id === course.id,
    );

    if (!foundCourse) {
      this.cartPayload.course.push(course);
    }
  }

  deleteCourseFromCart(courseId: string) {
    this.cartPayload.course = this.cartPayload.course.filter(
      (course) => course.id !== courseId,
    );
  }
}
