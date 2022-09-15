import { UserResponseDto } from '@user/dto';
import { TokenDto } from './token.dto';

export class LoginResponseDto {
  token: TokenDto;
  user: UserResponseDto;
}
