import { IsEmail, IsString, IsArray, IsOptional } from "class-validator";
import { UserReq } from '../../../app-types/user';

export class UserDto implements UserReq {
    @IsEmail()
    email: string;
   
    @IsString()
    firstName: string;
  
    @IsString()
    lastName: string
  
    @IsString()
    password: string;
  
    @IsArray()
    @IsOptional()
    userCategories?: any
  }
