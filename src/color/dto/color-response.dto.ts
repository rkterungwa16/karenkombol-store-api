import { ApiProperty } from '@nestjs/swagger';

export class ColorResponseDto {
  id: string;
  @ApiProperty({
    example: 'black',
  })
  name: string;

  @ApiProperty({
    example: '#000000',
  })
  hexCode: string;

  createdAt?: Date;
  updatedAt?: Date;
}
