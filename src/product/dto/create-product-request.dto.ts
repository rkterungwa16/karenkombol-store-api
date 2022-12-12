import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequestDto {
  @ApiProperty({
    example: 'categoryId',
  })
  category: string;

  @ApiProperty({
    example: 'imgurl',
  })
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'v-neck short-sleeve shirt',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'beautiful design for short sleeve shirt',
  })
  description: string;
}
