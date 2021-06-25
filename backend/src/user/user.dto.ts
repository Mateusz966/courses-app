import { CategoryDto } from "../../app-types/category";
import { IsEmail, IsString, IsArray, IsOptional, IsNotEmpty, MinLength } from "class-validator";
import { tooShort } from "utils/dtoValidators";
import { CustomSelectOption } from "../../../app-types/global";
import { UserReq } from '../../../app-types/user';

export class UserDto implements UserReq {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @MinLength(6, tooShort)
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsOptional()
  userCategories?: CustomSelectOption<CategoryDto>[]
}
