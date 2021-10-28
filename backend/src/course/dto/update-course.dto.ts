import { UpdateCourseReq } from 'app-types/course';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { tooLong, tooShort } from '../../../utils/dtoValidators';

export class UpdateCourseDto implements UpdateCourseReq {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, tooShort)
  @MaxLength(100, tooLong)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, tooShort)
  @MaxLength(500, tooLong)
  description: string;

  @IsOptional()
  @IsString()
  @MinLength(0, tooShort)
  @MaxLength(10000, tooLong)
  content: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
