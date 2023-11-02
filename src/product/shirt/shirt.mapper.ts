import { ImageMapper } from 'src/lib/image/image.mapper';
import { ShirtResponseDto } from './dto/shirt-response.dto';
import { Shirt } from './schema/shirt.schema';
import { CategoryMapper } from '@product/category/mappers';

export class ShirtMapper {
  public static toDto(model: Shirt): ShirtResponseDto {
    const dto = new ShirtResponseDto();

    dto.id = model._id;
    dto.description = model.description;
    dto.fit = model?.fit;
    dto.style = model?.style;
    dto.category =
      model?.category &&
      (typeof model?.category === 'string'
        ? model?.category
        : CategoryMapper.toDto(model?.category));
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