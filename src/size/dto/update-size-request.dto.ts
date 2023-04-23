import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdateSizeValueRequestDto } from './update-size-value-request.dto';

export class UpdateSizeRequestDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'General size',
  })
  type?: string;

  @IsOptional()
  @ValidateNested()
  @ApiProperty({
    example: {
      id: 'size-value_1234',
      value: 'XS',
    },
  })
  @Type(() => UpdateSizeValueRequestDto)
  sizeValue?: UpdateSizeValueRequestDto;
}
