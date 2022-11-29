import { ApiProperty } from '@nestjs/swagger';

export class UpdateCurrencyRequestDto {
  @ApiProperty({
    example: 'NGN',
  })
  code: string;

  @ApiProperty({
    example: '₦',
  })
  symbol: string;
}
