import { ClothingResponseDto } from '../dto/clothing-response.dto';
import { Clothing } from '../schema/clothing.schema';

export class ClothingMapper {
  public static toDto(model: Clothing): ClothingResponseDto {
    const dto = new ClothingResponseDto();

    dto.id = model._id;
    dto.name = model.name;
    // dto.description = model?.description;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
