import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ShirtFits } from '@product/interface/shirt.interface';

export class UpdateShirtDto {
  @IsOptional()
  @IsString()
  clothingId: string;

  @IsOptional()
  @IsString()
  styleId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'img_id',
  })
  imageId?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  fit?: ShirtFits;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'shirt',
  })
  description?: string;
}
