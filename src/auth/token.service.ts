import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { UserStatus } from '@enums';

import { User } from '@user/schemas/user.schema';
import {
  KKUnauthorizedException,
  UnauthorizedErrorType,
} from '@http/exceptions';
import { ValidateTokenResponseDto, JwtPayload, TokenDto } from './dtos';
import { TokenError, TokenType } from '@enums';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public generateAuthToken(payload: JwtPayload): TokenDto {
    const accessTokenExpires = this.configService.get(
      'ACCESS_TOKEN_EXPIRES_IN',
    );
    const refreshTokenExpires = this.configService.get(
      'REFRESH_TOKEN_EXPIRES_IN',
    );

    const tokenType = this.configService.get('TOKEN_TYPE');
    const accessToken = this.generateToken(payload, accessTokenExpires);
    const refreshToken = this.generateToken(payload, refreshTokenExpires);
    return {
      tokenType,
      accessToken,
      accessTokenExpires,
      refreshToken,
    };
  }

  public generateRefreshToken(refreshToken: string): TokenDto {
    const { id, email } = this.verifyToken(
      refreshToken,
      TokenType.RefreshToken,
    );
    return this.generateAuthToken({ id, email });
  }

  public verifyToken(token: string, type: TokenType) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get('TOKEN_SECRET'),
      });
    } catch ({ name }) {
      if (
        name === TokenError.TokenExpiredError &&
        type === TokenType.AccessToken
      ) {
        throw new KKUnauthorizedException(
          UnauthorizedErrorType.EXPIRED_ACCESS_TOKEN,
        );
      }
      if (
        name === TokenError.TokenExpiredError &&
        type === TokenType.RefreshToken
      ) {
        throw new KKUnauthorizedException(
          UnauthorizedErrorType.EXPIRED_REFRESH_TOKEN,
        );
      }
      throw new KKUnauthorizedException(UnauthorizedErrorType.INVALID_TOKEN);
    }
  }

  public async validateToken(token: string): Promise<ValidateTokenResponseDto> {
    try {
      const { id } = this.jwtService.verify(token, {
        secret: this.configService.get('TOKEN_SECRET'),
      });
      const user = await this.userModel.findById(id);
      if (
        !user ||
        user.status === UserStatus.BLOCKED ||
        user.status === UserStatus.INACTIVE
      ) {
        return { valid: false };
      }

      return { valid: !!id };
    } catch (error) {
      Logger.error('Validation token error', error);
      return { valid: false };
    }
  }

  private generateToken(payload: JwtPayload, expiresIn: string): string {
    const token = this.jwtService.sign(payload, {
      expiresIn,
      secret: this.configService.get('TOKEN_SECRET'),
      algorithm: 'HS256',
    });
    return token;
  }
}
