import { CategoryResponseDto } from './dto';
import { ICategory } from './interface/category.interface';

export class CategoryMapper {
  public static toDto(model: ICategory): CategoryResponseDto {
    const dto = new CategoryResponseDto();

    dto.id = model._id;
    dto.name = model.name;
    dto.description = model.description;
    dto.imageUrl = model.imageUrl;
    return dto;
  }
}
