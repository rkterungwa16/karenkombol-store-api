import { ImageMapper } from 'src/lib/image/image.mapper';
import { ProductResponseDto } from './dto';
import { Product } from './schema/product.schema';
import { CategoryMapper } from './category/category.mapper';

export class ProductMapper {
  public static toDto(model: Product): ProductResponseDto {
    const dto = new ProductResponseDto();

    dto.id = model._id;
    dto.name = model.name;
    dto.category =
      model?.category &&
      (typeof model?.category === 'string'
        ? model?.category
        : CategoryMapper.toDto(model?.category));
    dto.description = model.description;
    dto.image =
      model?.image &&
      (typeof model?.image === 'string'
        ? model?.image
        : ImageMapper.toDto(model?.image));
    dto.tags = model.tags;
    dto.status = model.status;
    dto.published = model.published;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
