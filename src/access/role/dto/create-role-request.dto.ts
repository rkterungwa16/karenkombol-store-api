import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateRoleRequestDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({
    example: 'admin',
  })
  name: string;

  @IsOptional()
  @ApiProperty({
    example: 'company_id',
  })
  company_id: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: ['permission_id'],
  })
  permissions?: string[];
}
