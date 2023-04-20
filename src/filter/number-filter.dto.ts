import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class NumberFilterDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  $lt?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  $gt?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  $lte?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  $gte?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  eq?: number;
}
