import { BaseSelectOption } from '../app-types/global';
import { UserReq } from '../app-types/user';

export type SignUpUserPayload = Omit<UserReq, 'userCategories'> & {
  userCategories: BaseSelectOption[];
};
