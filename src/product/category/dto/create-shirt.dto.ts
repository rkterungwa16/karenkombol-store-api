import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ShirtStyles, ShirtFits } from '../interface/category.interface';

export class CreateShirtDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  style: ShirtStyles;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'imgId',
  })
  image?: string;

  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  fit: ShirtFits;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'shirt',
  })
  description?: string;
}
