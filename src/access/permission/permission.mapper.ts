import { PermissionsResponseDto } from './dto';
import { Permission } from './schema/permission.schema';

export class PermissionMapper {
  public static toDto(model: Permission): PermissionsResponseDto {
    const dto = new PermissionsResponseDto();

    dto.id = model._id;
    dto.actions = model.actions;
    dto.resource = model.resource;
    return dto;
  }
}
