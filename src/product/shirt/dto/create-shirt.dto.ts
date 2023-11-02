import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ShirtFits } from '@product/interface/shirt.interface';

export class CreateShirtDto {
  @IsString()
  style_id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'imgId',
  })
  image_id?: string;

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
