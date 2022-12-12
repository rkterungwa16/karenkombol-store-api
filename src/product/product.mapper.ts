import { ProductResponseDto } from './dto';
import { IProduct } from './interface/product.interface';

export class ProductMapper {
  public static toDto(model: IProduct): ProductResponseDto {
    const dto = new ProductResponseDto();

    dto.id = model._id;
    dto.name = model.name;
    dto.description = model.description;
    dto.imageUrl = model.imageUrl;
    return dto;
  }
}
