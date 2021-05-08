import { CategoryDto, CreateCourseReq } from "app-types/category";
import { CustomSelectOption } from "app-types/global";
import { IsArray, IsNotEmpty } from "class-validator";

export class CreateCourseDto implements CreateCourseReq {

  @IsNotEmpty()
  category: CustomSelectOption<CategoryDto>;

  @IsNotEmpty()
  subcategory: CustomSelectOption<CategoryDto>;

  @IsNotEmpty()
  @IsArray()
  topics: CustomSelectOption<CategoryDto>[];
}
