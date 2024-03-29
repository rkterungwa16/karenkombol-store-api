import { ImageMapper } from '@lib/image/image.mapper';
import { ProductResponseDto } from './dto';
import { Product } from './schema/product.schema';
import { ClothingMapper } from './clothing/mappers';

export class ProductMapper {
  public static toDto(model: Product): ProductResponseDto {
    const dto = new ProductResponseDto();

    dto.id = model._id;
    dto.name = model.name;
    dto.category =
      model?.category &&
      (typeof model?.category === 'string'
        ? model?.category
        : ClothingMapper.toDto(model?.category));
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
