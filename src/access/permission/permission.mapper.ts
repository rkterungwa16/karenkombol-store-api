import { PermissionsResponseDto } from './dto';
import { IPermission } from './interfaces/permission.interface';

export class PermissionMapper {
  public static toDto(model: IPermission): PermissionsResponseDto {
    const dto = new PermissionsResponseDto();

    dto.id = model._id;
    dto.actions = model.actions;
    dto.resource = model.resource;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
