import { ApiProperty } from '@nestjs/swagger';
import {
  AgeGroup,
  BodyType,
  Gender,
  HeightGroup,
} from '../interface/category.interface';

export class CategoryResponseDto {
  @ApiProperty({
    example: 'categoryId',
  })
  id: string;
  @ApiProperty({
    example: 'male',
  })
  gender: string | Gender;

  @ApiProperty({
    example: 'adult',
  })
  ageGroup?: string | AgeGroup;

  @ApiProperty({
    example: 'slim',
  })
  bodyType?: string | BodyType;

  @ApiProperty({
    example: 'tall',
  })
  heightGroup?: string | HeightGroup;

  createdAt?: Date;
  updatedAt?: Date;
}
