import { Type, instanceToPlain } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { PaginationQuery } from '@pagination';
import { StringFilterDto } from '../../../filter/string-filter.dto';

export class RoleQueryDto extends PaginationQuery {
  @IsOptional()
  @ValidateNested()
  @Type(() => StringFilterDto)
  name?: StringFilterDto;
}

export class RoleQueryWithFilterDto extends RoleQueryDto {
  filter() {
    return {
      $and: [
        ...(this.name
          ? [
              {
                name: {
                  ...(this.name.$eq && { $eq: this.name.$eq }),
                  ...(this.name.$contains && { $regex: this.name.$contains }),
                },
              },
            ]
          : []),
        ...(this.createdAt
          ? [{ createdAt: instanceToPlain(this.createdAt) }]
          : []),
        ...(this.updatedAt
          ? [{ updatedAt: instanceToPlain(this.updatedAt) }]
          : []),
      ],
    };
  }
}
