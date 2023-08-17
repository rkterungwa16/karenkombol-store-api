import { UnauthorizedException } from '@nestjs/common';

const unauthorizedErrorType = {
  disabledUser: 'User not authorized to login',
  expiredAccessToken: 'Access token has expired',
  invalidCredentials: 'Invalid credentials',
  invalidToken: 'Invalid token',
  expiredRefreshToken: 'Refresh token has expired',
};

export enum UnauthorizedErrorType {
  DISABLED_USER = 'disabledUser',
  EXPIRED_ACCESS_TOKEN = 'expiredAccessToken',
  INVALID_CREDENTIALS = 'invalidCredentials',
  INVALID_TOKEN = 'invalidToken',
  EXPIRED_REFRESH_TOKEN = 'expiredRefreshToken',
}
export class KKUnauthorizedException extends UnauthorizedException {
  constructor(errorType: UnauthorizedErrorType) {
    super({
      errorType,
      message: unauthorizedErrorType[errorType],
    });
  }
}
