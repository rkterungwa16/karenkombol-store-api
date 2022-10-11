import { UserResponseDto } from '@user/dto';
import { TokenDto } from './token.dto';

export class LoginResponseDto {
  accessToken: TokenDto['accessToken'];
}
