import { CategoryResponseDto } from '../dto';
import { Category } from '../schema/category.schema';

export class CategoryMapper {
  public static toDto(model: Category): CategoryResponseDto {
    const dto = new CategoryResponseDto();

    dto.id = model._id;
    dto.gender = model.gender;
    dto.bodyType = model.bodyType;
    dto.heightGroup = model.heightGroup;
    dto.ageGroup = model.ageGroup;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
