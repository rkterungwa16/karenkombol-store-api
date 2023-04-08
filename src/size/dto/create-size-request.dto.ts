import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateSizeRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'General size',
  })
  type: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'XS',
  })
  value: string | number;
}
