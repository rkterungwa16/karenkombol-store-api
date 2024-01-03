import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ShirtStyles } from '@product/clothing/interface/clothing.interface';

export class CreateShirtStyleDto {
  @IsString()
  name: string | ShirtStyles;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'shirt',
  })
  description?: string;
}
