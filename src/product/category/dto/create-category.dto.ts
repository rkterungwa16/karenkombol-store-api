import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import {
  AgeGroup,
  BodyType,
  Gender,
  HeightGroup,
} from '../interface/category.interface';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'male',
  })
  @IsEnum(Gender)
  gender: string | Gender;

  @ApiProperty({
    example: 'woman',
  })
  @IsEnum(AgeGroup)
  ageGroup?: string | AgeGroup;

  @ApiProperty({
    example: 'slim',
  })
  @IsEnum(BodyType)
  bodyType?: string | BodyType;

  @ApiProperty({
    example: 'tall',
  })
  @IsEnum(HeightGroup)
  heightGroup?: string | HeightGroup;
}
