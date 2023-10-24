import { RoleMapper } from '@access/role/role.mapper';
import { UserResponseDto } from './dto';
import { User } from './schemas/user.schema';
import { PermissionMapper } from '@access/permission/permission.mapper';

export class UserMapper {
  public static async toDto(model: User): Promise<UserResponseDto> {
    const dto = new UserResponseDto();

    dto.id = model._id;
    dto.firstName = model.firstName;
    dto.lastName = model.lastName;
    dto.email = model.email;
    dto.avatar = model.avatar;
    dto.role =
      model?.role &&
      (typeof model?.role === 'string'
        ? model?.role
        : RoleMapper.toDto(model?.role));
    dto.permissions = model?.permissions.map((_permission) => {
      if (_permission) {
        return typeof _permission === 'string'
          ? _permission
          : PermissionMapper.toDto(_permission);
      }
    });
    dto.status = model.status;
    dto.company = model.company;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
