import { CategoryDto } from '../app-types/category';
import { CustomSelectOption } from '../app-types/global';
import { UserReq } from '../app-types/user';

export type SignUpUserPayload = Omit<UserReq, 'userCategories'> & {
  userCategories: CustomSelectOption<CategoryDto>[];
};
