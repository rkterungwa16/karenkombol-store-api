import { Transform } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class DateFilterDto {
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  $lt?: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  $gt?: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  $lte?: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  $gte?: Date;
}

export type DateFilter = {
  $lte?: string;
  $gt?: string;
  $$eq?: string;
};

export enum RangeFilter {
  LT = 'lt',
  LTE = 'lte',
  GT = 'gt',
  GTE = 'gte',
  EQ = 'equals',
}
