import { ImageMapper } from '@lib/image/image.mapper';
import { ShirtResponseDto } from '../dto/shirt-response.dto';
import { Shirt } from '../schema/shirt.schema';
import { ClothingMapper } from '@product/clothing/mappers';
import { ShirtStyleMapper } from './shirt-style.mapper';

export class ShirtMapper {
  public static toDto(model: Shirt): ShirtResponseDto {
    const dto = new ShirtResponseDto();

    dto.id = model._id;
    dto.description = model?.description;
    dto.fit = model?.fit;
    dto.name = model?.name;
    dto.style =
      model?.style &&
      (typeof model?.style === 'string'
        ? model?.style
        : ShirtStyleMapper.toDto(model?.style));
    dto.clothing =
      model?.clothing &&
      (typeof model?.clothing === 'string'
        ? model?.clothing
        : ClothingMapper.toDto(model?.clothing));
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
