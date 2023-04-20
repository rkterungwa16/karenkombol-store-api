import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DateFilterDto, NumberFilterDto } from '@filter';
import { PaginationQuery } from '@pagination';

export class SizeQueryDto extends PaginationQuery {
  @IsString()
  @IsOptional()
  type?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  amount?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DateFilterDto)
  createdAt?: DateFilterDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DateFilterDto)
  updatedAt?: DateFilterDto;

  @IsOptional()
  @Transform((value) => (typeof value === 'number' ? NumberFilterDto : value))
  value?: string | number;
}
