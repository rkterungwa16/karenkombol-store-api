import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'companyId',
  })
  company: string;

  @IsNotEmpty()
  @ApiProperty({
    example: ['permissionId'],
  })
  permissions: string[];
}
