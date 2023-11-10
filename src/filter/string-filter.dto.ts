import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class StringFilterDto {
  @IsOptional()
  @Transform(
    ({ value }) =>
      ({
        true: true,
        false: false,
      }[value]),
  )
  $eq?: boolean;

  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  $contains?: string;
}
