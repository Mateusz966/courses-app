import { BaseSelectOption } from "../app-types/global";
import { UserDefault } from "../app-types/user";

export interface UserSignUp extends UserDefault {
  userCategories: BaseSelectOption[];
}
