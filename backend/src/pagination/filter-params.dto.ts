import { IsOptional, IsString } from 'class-validator';

export class FilterParams {
  @IsString()
  @IsOptional()
  categories?: string;

  @IsString()
  @IsOptional()
  subcategories?: string;
}
