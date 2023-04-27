import { ProductResponseDto } from './dto';
import { IProduct } from './interface/product.interface';

export class ProductMapper {
  public static toDto(model: IProduct): ProductResponseDto {
    const dto = new ProductResponseDto();

    dto.id = model._id;
    dto.name = model.name;
    dto.description = model.description;
    dto.imageUrl = model.imageUrl;
    dto.tags = model.tags;
    dto.status = model.status;
    dto.published = model.published;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
