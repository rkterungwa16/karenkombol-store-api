import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { CreateShirtDto } from './create-shirt.dto';
import { ClothingTypes } from '../interface/category.interface';

export class CreateCategoryRequestDto {
  @IsString()
  @ApiProperty({
    example: 'women',
  })
  @Transform(({ value }) => value.toLowerCase())
  name: ClothingTypes;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateShirtDto)
  shirt?: CreateShirtDto;
}
