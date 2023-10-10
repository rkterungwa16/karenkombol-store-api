import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { DateFilterDto } from '@filter';

export class CategoryQueryDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => DateFilterDto)
  createdAt?: DateFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateFilterDto)
  updatedAt?: DateFilterDto;

  @IsOptional()
  @IsString()
  name?: string;
}
