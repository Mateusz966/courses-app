import { action, computed, makeObservable, observable } from 'mobx';
import { RootStore } from '.';
import { SetCourseInCart, ShoppingCart } from '../app-types';

export class ShoppingCartStore {
  root: RootStore;

  cartPayload: ShoppingCart = {
    course: [],
  };

  price = 0;

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      cartPayload: observable,
      addToCart: action.bound,
      deleteCourseFromCart: action.bound,
      deleteAllCourseFromCart: action.bound,
      totalPrice: computed,
    });
  }

  get totalPrice() {
    this.cartPayload.course.map((course) => this.price + course.price);
    return this.price;
  }

  addToCart(course: SetCourseInCart) {
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

  deleteAllCourseFromCart() {
    this.cartPayload.course = [];
  }
}
