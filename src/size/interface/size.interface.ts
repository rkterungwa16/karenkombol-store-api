import { SizeValueResponseDto } from '@size/dto/size-value-response.dto';

export interface ISize {
  _id: string;
  readonly type: string;
  readonly values?: SizeValueResponseDto[];
}
