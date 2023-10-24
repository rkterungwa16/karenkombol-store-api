import { ApiProperty } from '@nestjs/swagger';

export class PermissionsResponseDto {
  id: string;
  @ApiProperty({
    example: 'orders',
  })
  resource: string;

  @ApiProperty({
    example: 'create',
  })
  action: string;

  createdAt?: Date;
  updatedAt?: Date;
}
