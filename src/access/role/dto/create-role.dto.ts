import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateRolesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin',
  })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: ['permissionId'],
  })
  readonly permissions: string[];
}
