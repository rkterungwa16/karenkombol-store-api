import { ApiProperty } from '@nestjs/swagger';

export class UpdateSizeRequestDto {
  @ApiProperty({
    example: 'General size',
  })
  type: string;

  @ApiProperty({
    example: 'XS',
  })
  value: string | number;
}
