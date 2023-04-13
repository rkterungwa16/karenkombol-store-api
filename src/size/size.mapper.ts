import { SizeResponseDto } from './dto';
import { ISize } from './interface/size.interface';

export class SizeMapper {
  public static toDto(model: ISize): SizeResponseDto {
    const dto = new SizeResponseDto();

    dto.id = model._id;
    dto.type = model.type;
    dto.values = model.values;
    return dto;
  }
}
