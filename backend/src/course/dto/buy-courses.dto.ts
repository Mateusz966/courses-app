import { IsArray, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { BuyCoursesReq, Currency, SetCourseInCart } from '../../../app-types';

export class BuyCoursesDto implements BuyCoursesReq {
  @IsArray()
  courses: SetCourseInCart[];

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsEnum(Currency)
  currency: Currency;
}
