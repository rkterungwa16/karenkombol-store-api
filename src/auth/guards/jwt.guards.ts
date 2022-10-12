import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { extractJwt } from '@helpers';
import { TokenService } from '../token.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractJwt(request);
    return this.tokenService.validateToken(token).then(({ valid }) => {
      return valid;
    });
  }
}
