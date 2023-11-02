import { ShirtStyle } from '../schema/shirt-style.schema';
import { ShirtStyleResponseDto } from '../dto/shirt-style-response.dto';

export class ShirtStyleMapper {
  public static toDto(model: ShirtStyle): ShirtStyleResponseDto {
    const dto = new ShirtStyleResponseDto();

    dto.id = model._id;
    dto.name = model?.name;
    dto.description = model?.description;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
