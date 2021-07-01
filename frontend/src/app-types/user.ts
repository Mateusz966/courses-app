import { CustomSelectOption } from './global';
import { CategoryDto, ICategory } from './category';
import { ICourse } from './course';

// Internal type

export interface UserDefault {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  photoFn?: string;
}

export interface UserCategoriesReq {
  userCategories?: CustomSelectOption<CategoryDto>[];
}
export interface UserReq extends UserDefault, UserCategoriesReq {}

export interface UserRes {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUser extends UserDefault {
  id: string;
  userCategories: IUserCategories[];
  course: ICourse;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface IUserCategories {
  user: IUser;
  category: ICategory;
}
