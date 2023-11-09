import { instanceToPlain } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQuery } from '@pagination';

export class CategoryQueryDto extends PaginationQuery {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
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
