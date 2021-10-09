import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '.';

interface ShopingCart {
  course: Course[];
}

interface Course {
  id: string;
  title: string;
}

export class ShopingCartStore {
  root: RootStore;

  cartPayload: ShopingCart = {
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
    if (
      this.cartPayload.course.find(
        (courseInCart) => courseInCart.id === course.id,
      )
    ) {
      return;
    }
    this.cartPayload.course.push(course);
  }

  deleteCourseFromCart(courseId: string) {
    this.cartPayload.course = this.cartPayload.course.filter(
      (course) => course.id !== courseId,
    );
  }
}
