import { PermissionMapper } from '@access/permission/permission.mapper';
import { RoleResponseDto } from './dto';
import { Role } from './schemas/role.schema';

export class RoleMapper {
  public static toDto(model: Role): RoleResponseDto {
    const dto = new RoleResponseDto();

    dto.id = model._id;
    dto.company = model.company;
    dto.name = model.name;
    dto.slug = model.slug;
    dto.permissions = model?.permissions.map((_permission) => {
      if (_permission) {
        return typeof _permission === 'string'
          ? _permission
          : PermissionMapper.toDto(_permission);
      }
    });
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
