import { UserStatus } from '@enums';

export class CreateUserDto {
  company: string;
  email: string;
  password: string;
  roles: string[];
  status: UserStatus;
}
