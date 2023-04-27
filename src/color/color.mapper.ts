import { ColorResponseDto } from './dto';
import { IColor } from './interface/color.interface';

export class ColorMapper {
  public static toDto(model: IColor): ColorResponseDto {
    const dto = new ColorResponseDto();

    dto.id = model._id;
    dto.hexCode = model.hexCode;
    dto.name = model.name;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
