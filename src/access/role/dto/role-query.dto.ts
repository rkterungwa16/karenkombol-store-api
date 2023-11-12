import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PaginationQuery } from '@pagination';
import { StringFilterDto } from '../../../filter/string-filter.dto';

export class RoleQueryDto extends PaginationQuery {
  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilterDto)
  name?: StringFilterDto;
}
