import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CourseContentReq, ILesson } from '../../../app-types';

export class CourseContentDto implements CourseContentReq {
  @IsString()
  @IsNotEmpty()
  sectionName: string;

  @IsString()
  @IsNotEmpty()
  sectionDescription: string;

  @IsArray()
  @IsNotEmpty()
  lesson: Omit<ILesson, 'videoFn'>[];
}
