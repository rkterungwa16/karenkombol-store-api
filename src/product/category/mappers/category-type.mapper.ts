import { CategoryTypeResponseDto } from '../dto/category-type-response.dto';
import { CategoryType } from '../schema/category-type.schema';

export class CategoryTypeMapper {
  public static toDto(model: CategoryType): CategoryTypeResponseDto {
    const dto = new CategoryTypeResponseDto();

    dto.id = model._id;
    dto.name = model.name;
    dto.description = model?.description;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
