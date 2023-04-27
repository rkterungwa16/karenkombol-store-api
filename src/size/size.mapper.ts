import { SizeResponseDto } from './dto';

export class SizeMapper {
  public static toDto(model): SizeResponseDto {
    const dto = new SizeResponseDto();

    dto.id = model._id;
    dto.type = model.type;
    dto.values = model.values;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
