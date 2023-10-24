import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@enums';
import { RoleResponseDto } from '@access/role/dto';
import { PermissionsResponseDto } from '@access/permission/dto';

export class UserResponseDto {
  id: string;

  @ApiProperty({
    example: 'karenkombol-ateliers',
  })
  companyName: string;

  @ApiProperty({
    example: 'karen@karenkombol-ateliers.com',
  })
  email: string;

  firstName?: string;

  lastName?: string;

  company?: string;

  avatar?: string;

  status: UserStatus;

  role?: string | RoleResponseDto;

  permissions?: (string | PermissionsResponseDto)[];

  createdAt?: Date;
  updatedAt?: Date;
}
