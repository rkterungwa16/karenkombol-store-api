import { TokenDto } from './token.dto';

export class LoginResponseDto {
  accessToken: TokenDto['accessToken'];
  refreshToken: TokenDto['refreshToken'];
}
