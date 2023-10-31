import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ClothingTypes } from '../interface/category.interface';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({
    example: 'women',
  })
  @Transform(({ value }) => value.toLowerCase())
  name: ClothingTypes;

  @IsString()
  @ApiProperty({
    example: 'category description',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'women',
  })
  shirt?: string;
}
