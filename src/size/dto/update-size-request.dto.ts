import { ApiProperty } from '@nestjs/swagger';

export class UpdateSizeRequestDto {
  @ApiProperty({
    example: 'General size',
  })
  type?: string;

  @ApiProperty({
    example: {
      id: 'size-value_1234',
      value: 'XS',
    },
  })
  sizeValue?: {
    id: string;
    value: string | number;
  };
}
