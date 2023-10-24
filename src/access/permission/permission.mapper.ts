import { PermissionsResponseDto } from './dto';
import { Permission } from './schema/permission.schema';

export class PermissionMapper {
  public static toDto(model: Permission): PermissionsResponseDto {
    const dto = new PermissionsResponseDto();

    dto.id = model._id;
    dto.action = model.action;
    dto.resource = model.resource;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
