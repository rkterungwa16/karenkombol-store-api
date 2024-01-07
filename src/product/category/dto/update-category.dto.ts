import { IsEnum, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  AgeGroup,
  BodyType,
  Gender,
  HeightGroup,
} from '../interface/category.interface';

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'male',
  })
  @IsOptional()
  @IsEnum(Gender)
  gender: string | Gender;

  @ApiProperty({
    example: 'woman',
  })
  @IsOptional()
  @IsEnum(AgeGroup)
  ageGroup?: string | AgeGroup;

  @ApiProperty({
    example: 'slim',
  })
  @IsOptional()
  @IsEnum(BodyType)
  bodyType?: string | BodyType;

  @ApiProperty({
    example: 'tall',
  })
  @IsOptional()
  @IsEnum(HeightGroup)
  heightGroup?: string | HeightGroup;
}
