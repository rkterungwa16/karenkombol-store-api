import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ClothingTypes } from '../interface/category.interface';
import { UpdateShirtDto } from './update-shirt.dto';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'women',
  })
  @Transform(({ value }) => value.toLowerCase())
  name?: ClothingTypes;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateShirtDto)
  shirt?: UpdateShirtDto;
}
