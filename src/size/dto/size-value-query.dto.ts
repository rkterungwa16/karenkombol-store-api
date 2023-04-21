import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { NumberFilterDto } from '@filter';

export class SizeValueQueryDto {
  @IsOptional()
  @Type(() => NumberFilterDto)
  value?: NumberFilterDto;
}
