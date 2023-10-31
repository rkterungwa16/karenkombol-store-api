import { instanceToPlain, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { DateFilterDto } from '@filter';
import { PaginationQuery } from '@pagination';

export class CategoryQueryDto extends PaginationQuery {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateFilterDto)
  createdAt?: DateFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateFilterDto)
  updatedAt?: DateFilterDto;
}

export class CategoryQueryWithFilterDto extends CategoryQueryDto {
  filter() {
    return {
      $and: [
        ...(this.name ? [{ type: this.name }] : []),
        ...(this.createdAt
          ? [{ createdAt: instanceToPlain(this.createdAt) }]
          : []),
        ...(this.updatedAt
          ? [{ updatedAt: instanceToPlain(this.updatedAt) }]
          : []),
      ],
    };
  }
}
