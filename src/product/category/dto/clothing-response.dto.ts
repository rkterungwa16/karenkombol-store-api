import { ApiProperty } from '@nestjs/swagger';

export class ClothingResponseDto {
  @ApiProperty({
    example: 'categoryId',
  })
  id: string;

  @ApiProperty({
    example: 'women',
  })
  name: string;

  // @ApiProperty({
  //   example: 'list of women clothes',
  // })
  // description: string;

  createdAt?: Date;
  updatedAt?: Date;
}
