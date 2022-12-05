import { CurrencyResponseDto } from './dto';
import { ICurrency } from './interface/currency.interface';

export class CurrencyMapper {
  public static toDto(model: ICurrency): CurrencyResponseDto {
    const dto = new CurrencyResponseDto();

    dto.id = model._id;
    dto.code = model.code;
    dto.symbol = model.symbol;
    return dto;
  }
}
