import { RoleResponseDto, CreateRoleRequestDto } from './dto';
import { Role } from './schemas/role.schema';

export class RoleMapper {
  public static toDto(model: Role): RoleResponseDto {
    const dto = new RoleResponseDto();

    dto.id = model._id;
    dto.company = model.company;
    dto.name = model.name;
    dto.permissions = model.permissions;
    return dto;
  }
}
