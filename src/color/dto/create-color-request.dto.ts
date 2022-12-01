import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateColorRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'black',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '#000000',
  })
  hexCode: string;
}
