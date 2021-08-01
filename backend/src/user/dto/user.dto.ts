import {
  IsEmail,
  IsString,
  IsArray,
  IsOptional,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { tooShort } from 'utils/dtoValidators';
import { CustomSelectOption, UserReq, CategoryDto } from '../../../app-types';

export class UserDto implements UserReq {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MinLength(6, tooShort)
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsOptional()
  userCategories?: CustomSelectOption<CategoryDto>[];
}
