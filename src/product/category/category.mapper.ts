import { CategoryResponseDto } from './dto';
import { ICategory } from './interface/category.interface';

export class CategoryMapper {
  public static toDto(model: ICategory): CategoryResponseDto {
    const dto = new CategoryResponseDto();

    dto.id = model._id;
    dto.name = model.name;
    if (model?.description) {
      dto.description = model.description;
    }
    if (model.imageUrl) {
      dto.imageUrl = model.imageUrl;
    }
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
