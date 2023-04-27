import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryRequestDto {
  @ApiProperty({
    example: 'imgurl',
  })
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'women',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'women clothes',
  })
  description?: string;
}
