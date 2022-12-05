import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IRole } from '../interfaces/roles.interface';

export class CreateRoleRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin',
  })
  name: IRole['name'];

  @IsNotEmpty()
  @ApiProperty({
    example: 'companyId',
  })
  company: IRole['company'];

  @IsNotEmpty()
  @ApiProperty({
    example: ['permissionId'],
  })
  permissions: IRole['permissions'];
}
