import { ApiProperty } from '@nestjs/swagger';
import { SizeValueResponseDto } from './size-value-response.dto';

export class SizeResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    example: 'General size',
  })
  type: string;

  @ApiProperty({
    example: [{ value: 'XS', size: 'size_1234' }],
  })
  values: SizeValueResponseDto[];

  createdAt?: Date;

  updatedAt?: Date;
}
