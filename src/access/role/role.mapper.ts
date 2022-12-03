import { RoleResponseDto } from './dto';
import { IRole } from './interfaces/roles.interface';

export class RoleMapper {
  public static toDto(model: IRole): RoleResponseDto {
    const dto = new RoleResponseDto();

    dto.id = model._id;
    dto.company = model.company;
    dto.name = model.name;
    dto.permissions = model.permissions;
    return dto;
  }
}
