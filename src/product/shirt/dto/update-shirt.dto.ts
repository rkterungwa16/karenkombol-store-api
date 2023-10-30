import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ShirtFits, ShirtStyles } from '@product/interface/shirt.interface';

export class UpdateShirtDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  style?: ShirtStyles;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'imgId',
  })
  image?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  fit: ShirtFits;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'shirt',
  })
  description?: string;
}
