import { ShirtMapper } from '@product/shirt/mapper';
import { ClothingResponseDto } from '../dto';
import { Clothing } from '../schema/clothing.schema';

export class ClothingMapper {
  public static toDto(model: Clothing): ClothingResponseDto {
    const dto = new ClothingResponseDto();

    dto.id = model._id;
    dto.name = model.name;
    dto.description = model.description;
    dto.shirts =
      model?.shirts &&
      model?.shirts.map((_shirt) => {
        if (_shirt) {
          return typeof _shirt === 'string'
            ? _shirt
            : ShirtMapper.toDto(_shirt);
        }
      });
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
