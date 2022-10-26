import { ApiProperty } from '@nestjs/swagger';

export class PermissionsResponseDto {
  id: string;
  @ApiProperty({
    example: 'orders',
  })
  resource: string;

  @ApiProperty({
    example: ['create', 'update', 'read', 'delete'],
  })
  actions: string[];
}
