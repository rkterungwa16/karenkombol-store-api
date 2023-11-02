import { ShirtMapper } from '@product/shirt/mapper';
import { CategoryResponseDto } from '../dto';
import { Category } from '../schema/category.schema';

export class CategoryMapper {
  public static toDto(model: Category): CategoryResponseDto {
    const dto = new CategoryResponseDto();

    dto.id = model._id;
    dto.name = model.name;
    dto.description = model.description;
    dto.shirts = model?.shirts.map((_shirt) => {
      if (_shirt) {
        return typeof _shirt === 'string' ? _shirt : ShirtMapper.toDto(_shirt);
      }
    });
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
