import { CurrencyStatus } from '@currency/interface/currency.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CurrencyResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    example: 'NGN',
  })
  code: string;

  @ApiProperty({
    example: '₦',
  })
  symbol: string;

  @ApiProperty({
    example: 1,
  })
  rate: number;

  createdAt?: Date;
  updatedAt?: Date;
  status?: CurrencyStatus;
}
