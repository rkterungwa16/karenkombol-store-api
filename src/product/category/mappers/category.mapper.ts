import { CategoryResponseDto } from '../dto';
import { Category } from '../schema/category.schema';
import { ClothingMapper } from './clothing.mapper';
import { ShirtMapper } from './shirt.mapper';

export class CategoryMapper {
  public static toDto(model: Category): CategoryResponseDto {
    const dto = new CategoryResponseDto();

    dto.id = model._id;
    dto.shirt =
      model?.shirt &&
      (typeof model?.shirt === 'string'
        ? model?.shirt
        : ShirtMapper.toDto(model?.shirt));
    dto.clothing =
      model?.clothing &&
      (typeof model?.clothing === 'string'
        ? model?.clothing
        : ClothingMapper.toDto(model?.clothing));
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
