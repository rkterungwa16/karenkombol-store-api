import { ImageResponseDto } from './dto';
import { IMage } from './interface/image.interface';

export class ImageMapper {
  public static toDto(model: IMage): ImageResponseDto {
    const dto = new ImageResponseDto();

    dto.id = model._id;
    dto.url = model.url;
    dto.name = model.name;
    dto.fileId = model.fileId;
    dto.imageType = model.imageType;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
