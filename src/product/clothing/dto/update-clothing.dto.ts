import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ClothingTypes } from '../interface/clothing.interface';

export class UpdateClothingDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'women',
  })
  @Transform(({ value }) => value.toLowerCase())
  name?: ClothingTypes;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'category description',
  })
  description?: string;
}
