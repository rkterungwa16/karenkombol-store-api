import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class StringFilterDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  $eq?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  $contains?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.toLowerCase())
  $in?: string[];
}
