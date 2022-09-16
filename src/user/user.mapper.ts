import { UserResponseDto } from './dto';
import { User } from './schemas/user.schema';

export class UserMapper {
  public static async toDto(model: User): Promise<UserResponseDto> {
    const dto = new UserResponseDto();

    dto.id = model._id;
    dto.firstName = model.firstName;
    dto.lastName = model.lastName;
    dto.email = model.email;
    dto.avatar = model.avatar;
    dto.roles = model.roles;
    dto.status = model.status;
    dto.company = model.company;
    return dto;
  }
}
