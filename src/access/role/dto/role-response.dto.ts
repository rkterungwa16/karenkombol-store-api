import { ApiProperty } from '@nestjs/swagger';
import { PermissionsResponseDto } from '@access/permission/dto';
import { Company } from '@company/schema/company.schema';

export class RoleResponseDto {
  @ApiProperty({
    example: 'roleId',
  })
  id: string;
  @ApiProperty({
    example: {
      name: 'karenkombol-ateliers',
      email: 'admin@karenkombol-ateliers.com',
    },
  })
  company: string | Company;

  @ApiProperty({
    example: 'super admin',
  })
  name: string;

  @ApiProperty({
    example: 'super_admin',
  })
  slug: string;

  @ApiProperty({
    example: [
      {
        resource: 'order',
        actions: 'create',
      },
    ],
  })
  permissions: (string | PermissionsResponseDto)[];

  createdAt?: Date;
  updatedAt?: Date;
}
