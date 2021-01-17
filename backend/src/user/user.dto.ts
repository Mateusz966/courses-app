import { IsEmail, IsString, IsNotEmpty } from "class-validator";
import { BaseSelectOption } from "../../../types/global";
import { UserReq } from "../../../types/user";

export class UserDto implements UserReq {
    @IsEmail()
    email: string;
   
    @IsString()
    firstName: string;
  
    @IsString()
    lastName: string
  
    @IsString()
    password: string;
  
    @IsNotEmpty()
    userCategories: any[];
  }