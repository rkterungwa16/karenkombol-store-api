import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleRequestDto {
  @ApiProperty({
    example: 'admin',
  })
  name: string;

  @ApiProperty({
    example: ['permissionId'],
  })
  permissions: string[];
}
