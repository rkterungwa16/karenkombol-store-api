import { ApiProperty } from '@nestjs/swagger';

export class SizeValueResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    example: 'size_1234',
  })
  size: string;

  @ApiProperty({
    example: 'XS',
  })
  value: string | number;
}
