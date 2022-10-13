import { Request } from 'express';

import { JwtDetails } from '@enums';

export const extractJwt = (request: Request) => {
  if (request.headers[JwtDetails.AUTH_HEADER]) {
    const [bearer, token] = request.headers[JwtDetails.AUTH_HEADER].split(' ');
    if (bearer.toLowerCase() === JwtDetails.BEARER_AUTH_SCHEME) {
      return token;
    }
  }
  return null;
};
