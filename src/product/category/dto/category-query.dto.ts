import { instanceToPlain } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQuery } from '@pagination';
import {
  AgeGroup,
  BodyType,
  Gender,
  HeightGroup,
} from '../interface/category.interface';

export class CategoryQueryDto extends PaginationQuery {
  @IsOptional()
  @IsEnum(Gender)
  gender: string | Gender;

  @IsOptional()
  @IsEnum(AgeGroup)
  ageGroup?: string | AgeGroup;

  @IsOptional()
  @IsEnum(BodyType)
  bodyType?: string | BodyType;

  @IsOptional()
  @IsEnum(HeightGroup)
  heightGroup?: string | HeightGroup;
}

export class CategoryQueryWithFilterDto extends CategoryQueryDto {
  filter() {
    return {
      $and: [
        ...(this.gender ? [{ gender: this.gender }] : []),
        ...(this.ageGroup ? [{ ageGroup: this.ageGroup }] : []),
        ...(this.bodyType ? [{ bodyType: this.bodyType }] : []),
        ...(this.heightGroup ? [{ heightGroup: this.heightGroup }] : []),
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
