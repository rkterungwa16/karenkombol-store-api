import { IsNumberOrString } from '@helpers';
import { IsOptional, Validate } from 'class-validator';

export class AddSizeValueRequestDto {
  @IsOptional()
  @Validate(IsNumberOrString)
  value?: string | number;
}
