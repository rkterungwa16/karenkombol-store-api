import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CurrencyStatus } from '@currency/interface/currency.interface';

export class CreateCurrencyRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'NGN',
  })
  code: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '₦',
  })
  symbol: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  rate: number;

  status?: CurrencyStatus;
}
