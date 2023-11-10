import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateRoleRequestDto {
  @ApiProperty({
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: ['permissionId'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
