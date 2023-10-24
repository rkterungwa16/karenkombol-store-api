import { ApiProperty } from '@nestjs/swagger';
import { ICompany } from '@company/interface/company.interface';
import { PermissionsResponseDto } from '@access/permission/dto';

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
  company: string | ICompany;

  @ApiProperty({
    example: 'admin',
  })
  name: string;

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
