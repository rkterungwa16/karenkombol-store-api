import { Request, Response } from 'express';
import {
  ValidationPipe,
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  AuthCredentialsRequestDto,
  ValidateTokenResponseDto,
  ValidateTokenRequestDto,
  RefreshTokenRequestDto,
  LoginResponseDto,
} from './dtos';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @ApiOperation({ description: 'User authentication' })
  @ApiOkResponse({ description: 'Successfully authenticated user' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/login')
  async login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto> {
    const token = await this.authService.login(authCredentialsDto);
    response
      .cookie('x-session-token', token.refreshToken, {
        // Valid for 30 day
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(HttpStatus.OK);
    return {
      accessToken: token.accessToken,
    };
  }

  @ApiOperation({ description: 'Renew access in the application' })
  @ApiOkResponse({ description: 'token successfully renewed' })
  @ApiUnauthorizedResponse({ description: 'Refresh token invalid or expired' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/token/refresh')
  async getNewToken(
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto> {
    const { refreshToken } = refreshTokenDto;
    const token = await this.tokenService.generateRefreshToken(refreshToken);
    response
      .cookie('x-session-token', token.refreshToken, {
        // Valid for 30 day
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(HttpStatus.OK);
    return {
      accessToken: token.accessToken,
    };
  }

  @ApiOperation({ description: 'Validate token' })
  @ApiOkResponse({ description: 'Validation was successful' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/token/validate')
  async validateToken(
    @Body(ValidationPipe) validateToken: ValidateTokenRequestDto,
  ): Promise<ValidateTokenResponseDto> {
    const { token } = validateToken;
    return this.tokenService.validateToken(token);
  }
}
