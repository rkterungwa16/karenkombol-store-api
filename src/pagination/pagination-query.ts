import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

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
}
