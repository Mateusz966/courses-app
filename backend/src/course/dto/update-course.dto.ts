import { UpdateCourseReq } from 'app-types/course';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
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

  @IsNotEmpty()
  @IsString()
  @MinLength(3, tooShort)
  @MaxLength(10000, tooLong)
  content: string;
}
