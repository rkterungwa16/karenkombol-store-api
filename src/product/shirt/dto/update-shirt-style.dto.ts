import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ShirtStyles } from '@product/interface/shirt.interface';

export class UpdateShirtStyleDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  name?: string | ShirtStyles;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'shirt',
  })
  description?: string;
}
