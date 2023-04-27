import { IsNotEmpty, IsString, Validate } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumberOrString } from '@helpers';

export class CreateSizeRequestDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({
    example: 'General size',
  })
  type: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'XS',
  })
  @Validate(IsNumberOrString)
  value?: string | number;
}
