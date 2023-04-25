import { instanceToPlain, Type } from 'class-transformer';
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
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateFilterDto)
  createdAt?: DateFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateFilterDto)
  updatedAt?: DateFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SizeValueQueryDto)
  values?: SizeValueQueryDto;
}

export class SizeQueryWithFilterDto extends SizeQueryDto {
  filter() {
    return {
      $and: [
        ...(this.type ? [{ type: this.type }] : []),
        ...(this.createdAt
          ? [{ createdAt: instanceToPlain(this.createdAt) }]
          : []),
        ...(this.updatedAt
          ? [{ updatedAt: instanceToPlain(this.updatedAt) }]
          : []),
      ],
      ...(this.values ? { values: instanceToPlain(this.values) } : {}),
    };
  }
}
