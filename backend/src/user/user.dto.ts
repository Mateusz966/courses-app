import { IsEmail, IsString, IsNotEmpty } from "class-validator";
import { BaseSelectOption } from "../../../types/default";
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
    category: any[];
  }