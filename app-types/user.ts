
// Internal type
export interface UserDefault {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserCategoriesReq {
  userCategories?: { id: string }[]
}
export interface UserReq extends UserDefault, UserCategoriesReq {
  
}

export interface UserRes {
  id: string
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserEntity extends UserDefault {
  id: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
export interface UserMyProfile {
  email: string;
  firstName: string;
  lastName: string;
}
export interface UserSetPassword {
  newPassword: string;
  oldPassword: string;
}