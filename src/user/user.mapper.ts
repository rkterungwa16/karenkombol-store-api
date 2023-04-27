import { UserResponseDto } from './dto';

export class UserMapper {
  public static async toDto(model): Promise<UserResponseDto> {
    const dto = new UserResponseDto();

    dto.id = model._id;
    dto.firstName = model.firstName;
    dto.lastName = model.lastName;
    dto.email = model.email;
    dto.avatar = model.avatar;
    dto.roles = model.roles;
    dto.status = model.status;
    dto.company = model.company;
    dto.createdAt = model.createdAt;
    dto.updatedAt = model.updatedAt;
    return dto;
  }
}
