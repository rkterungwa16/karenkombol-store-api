import { CategoryResponseDto } from '../dto';
import { Category } from '../schema/category.schema';
import { ClothingMapper } from './clothing.mapper';
import { ShirtCategoryMapper } from './shirt-category.mapper';

export class CategoryMapper {
  public static toDto(model: Category): CategoryResponseDto {
    const dto = new CategoryResponseDto();

    dto.id = model._id;
    dto.shirts = model?.shirts.map((_shirt) => {
      if (_shirt) {
        return typeof _shirt === 'string'
          ? _shirt
          : ShirtCategoryMapper.toDto(_shirt);
      }
    });
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
