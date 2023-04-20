import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class BooleanFilterDto {
  @IsOptional()
  @Transform(
    ({ value }) =>
      ({
        true: true,
        false: false,
      }[value]),
  )
  eq?: boolean;
}
