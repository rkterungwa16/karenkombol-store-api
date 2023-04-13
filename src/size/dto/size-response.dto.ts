import { ApiProperty } from '@nestjs/swagger';

export class SizeResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    example: 'General size',
  })
  type: string;

  @ApiProperty({
    example: ['XS'],
  })
  values: (string | number)[];
}
