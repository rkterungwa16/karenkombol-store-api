import { ImageMapper } from 'src/lib/image/image.mapper';
import { CategoryResponseDto } from './dto';
import { Category } from './schema/category.schema';

export class CategoryMapper {
  public static toDto(model: Category): CategoryResponseDto {
    const dto = new CategoryResponseDto();

    dto.id = model._id;
    dto.name = model.name;
    dto.description = model.description;
    dto.image =
      model?.image &&
      (typeof model?.image === 'string'
        ? model?.image
        : ImageMapper.toDto(model?.image));
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
