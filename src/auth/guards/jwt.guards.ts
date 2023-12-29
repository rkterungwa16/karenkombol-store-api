import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { extractJwt } from '@helpers';
import { TokenService } from '../token.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // TODO: check for refresh token
    // TODO: check if refresh token is expired
    const token = extractJwt(request);
    const { valid } = await this.tokenService.validateToken(token);
    return valid;
  }
}
