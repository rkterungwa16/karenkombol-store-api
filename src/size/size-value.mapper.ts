import { SizeValueResponseDto } from './dto/size-value-response.dto';
import { ISizeValue } from './interface/size-value.interface';

export class SizeValueMapper {
  public static toDto(model: ISizeValue): SizeValueResponseDto {
    const dto = new SizeValueResponseDto();

    dto.id = model._id;
    dto.size = model.size;
    dto.value = model.value;
    return dto;
  }
}
