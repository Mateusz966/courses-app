import { IsOptional, IsString } from 'class-validator';

export class FilterParams {
  @IsString()
  @IsOptional()
  category?: string;
}
