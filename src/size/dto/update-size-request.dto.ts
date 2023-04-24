import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdateSizeValueRequestDto } from './update-size-value-request.dto';

export class UpdateSizeRequestDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
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
