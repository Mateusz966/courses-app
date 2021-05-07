import { IsEmail, IsString, IsArray, IsOptional, IsNotEmpty } from "class-validator";
import { UserReq } from '../../../app-types/user';

export class UserDto implements UserReq {
    @IsEmail()
    @IsNotEmpty({ message: `{"key": "formErrors.cannot_be_empty"}` })
    email: string;
   
    @IsString()
    @IsNotEmpty()
    firstName: string;
  
    @IsString()
    @IsNotEmpty()
    lastName: string
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsArray()
    @IsOptional()
    userCategories?: any
  }
