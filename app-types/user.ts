
// Internal type
interface UserDefault {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserReq extends UserDefault {
  userCategories?: any
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