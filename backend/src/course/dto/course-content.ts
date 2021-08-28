import { CategoryDto, CreateCourseReq } from "app-types/category";
import { CourseContentReq, ILesson } from "app-types/course";
import { CustomSelectOption } from "app-types/global";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Lesson } from "../entities/lesson.entity";

export class CreateCourseDto implements CourseContentReq {

    @IsString()
    @IsNotEmpty()
    sectionName: string;

    @IsString()
    @IsNotEmpty()
    sectionDescription: string;

    @IsArray()
    @IsNotEmpty()
    lesson: Omit<ILesson, 'videoFn'>[]

}
