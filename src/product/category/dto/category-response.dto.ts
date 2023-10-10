import { ApiProperty } from '@nestjs/swagger';
import { ImageResponseDto } from 'src/lib/image/dto';

export class CategoryResponseDto {
  @ApiProperty({
    example: 'categoryId',
  })
  id: string;
  @ApiProperty({
    example: 'imageId',
  })
  image: string | ImageResponseDto;

  @ApiProperty({
    example: 'women',
  })
  name: string;

  @ApiProperty({
    example: 'list of women clothes',
  })
  description: string;

  createdAt?: Date;
  updatedAt?: Date;
}
