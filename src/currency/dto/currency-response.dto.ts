import { ApiProperty } from '@nestjs/swagger';

export class CurrencyResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    example: {
      example: 'NGN',
    },
  })
  code: string;

  @ApiProperty({
    example: '₦',
  })
  symbol: string;
}
