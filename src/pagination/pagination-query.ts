import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min, ValidateNested } from 'class-validator';
import { DateFilterDto } from '@filter';
import { PaginationSortOrder } from './pagination-request.interface';

export class PaginationQuery {
  static readonly DEFAULT_LIMIT = 10;

  @Min(1)
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @Min(1)
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit = PaginationQuery.DEFAULT_LIMIT;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  skip = 0;

  // @IsOptional()
  // @ValidateNested()
  // orderBy?: { [field: string]: PaginationSortOrder };

  @IsOptional()
  @ValidateNested()
  @Type(() => DateFilterDto)
  createdAt?: DateFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateFilterDto)
  updatedAt?: DateFilterDto;
}
