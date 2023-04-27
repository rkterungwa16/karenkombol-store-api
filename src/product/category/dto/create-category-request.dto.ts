import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateCategoryRequestDto {
  @ApiProperty({
    example: 'imgurl',
  })
  imageUrl?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'women',
  })
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'women clothes',
  })
  description?: string;
}
