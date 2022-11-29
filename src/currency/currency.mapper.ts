import { CurrencyResponseDto } from './dto';
import { Currency } from './schema/currency.schema';

export class CurrencyMapper {
  public static toDto(model: Currency): CurrencyResponseDto {
    const dto = new CurrencyResponseDto();

    dto.id = model._id;
    dto.code = model.code;
    dto.symbol = model.symbol;
    return dto;
  }
}
