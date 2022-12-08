import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryRequestDto {
  @ApiProperty({
    example: 'imgurl',
  })
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'women',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'women clothes',
  })
  description: string;
}
