import { instanceToPlain, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { DateFilterDto } from '@filter';
import { PaginationQuery } from '@pagination';
import { ClothingQueryDto } from '@product/clothing/dto/clothing-query.dto';

export class ProductQueryDto extends PaginationQuery {
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
  @Type(() => ClothingQueryDto)
  category?: ClothingQueryDto;
}

export class ProductQueryWithFilterDto extends ProductQueryDto {
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
      ...(this.category ? { values: instanceToPlain(this.category) } : {}),
    };
  }
}
