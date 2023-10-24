import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'orders',
  })
  readonly resource: string;

  @IsNotEmpty()
  @ApiProperty({
    example: ['create', 'update', 'read', 'delete'],
  })
  readonly action: string;
}
