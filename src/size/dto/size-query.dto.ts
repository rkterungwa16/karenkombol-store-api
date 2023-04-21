import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DateFilterDto, NumberFilterDto } from '@filter';
import { PaginationQuery } from '@pagination';
import { SizeValueQueryDto } from './size-value-query.dto';

export class SizeQueryDto extends PaginationQuery {
  @IsString()
  @IsOptional()
  type?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => NumberFilterDto)
  amount?: NumberFilterDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DateFilterDto)
  createdAt?: DateFilterDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DateFilterDto)
  updatedAt?: DateFilterDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SizeValueQueryDto)
  values?: SizeValueQueryDto;
}
