import { ApiProperty } from '@nestjs/swagger';

export class UpdateColorRequestDto {
  @ApiProperty({
    example: 'black',
  })
  name: string;

  @ApiProperty({
    example: '#000000',
  })
  hexCode: string;
}
