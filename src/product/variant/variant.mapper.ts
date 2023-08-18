import { VariantResponsetDto } from './dto';

export class VariantMapper {
  public static toDto(model): VariantResponsetDto {
    const dto = new VariantResponsetDto();

    dto.id = model._id;
    dto.product = model.product;
    dto.imageUrls = model.imageUrls;
    dto.productColor = model.productColor;
    dto.productSize = model.productSize;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
