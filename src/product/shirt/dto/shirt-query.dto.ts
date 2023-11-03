import { instanceToPlain, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { DateFilterDto } from '@filter';
import { PaginationQuery } from '@pagination';
import { ShirtFits, ShirtStyles } from '@product/interface/shirt.interface';

export class ShirtQueryDto extends PaginationQuery {
  @IsOptional()
  @IsString()
  style: string | ShirtStyles;

  @IsOptional()
  @IsString()
  fit: ShirtFits;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateFilterDto)
  createdAt?: DateFilterDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateFilterDto)
  updatedAt?: DateFilterDto;
}

export class ShirtQueryWithFilterDto extends ShirtQueryDto {
  filter() {
    return {
      $and: [
        ...(this.style ? [{ 'style.name': this.style }] : []),
        ...(this.fit ? [{ fit: this.fit }] : []),
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
