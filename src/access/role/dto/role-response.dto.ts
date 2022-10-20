import { ApiProperty } from '@nestjs/swagger';
import { ICompany } from '@company/interface/company.interface';
import { IPermissions } from '@access/permission/interfaces/permission.interface';

export class RoleResponseDto {
  @ApiProperty()
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
        actions: ['create', 'update', 'read'],
      },
    ],
  })
  permissions: string[] | IPermissions[];
}
