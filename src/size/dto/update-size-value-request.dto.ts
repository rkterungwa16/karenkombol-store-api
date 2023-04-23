import { IsNumberOrString } from '@helpers';
import { IsOptional, IsString, Validate } from 'class-validator';

export class UpdateSizeValueRequestDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @Validate(IsNumberOrString)
  value?: string | number;
}
