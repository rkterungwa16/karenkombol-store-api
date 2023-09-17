import { Request, Response } from 'express';
import { Controller, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiConflictResponse,
} from '@nestjs/swagger';

import {
  AuthCredentialsRequestDto,
  ValidateTokenResponseDto,
  ValidateTokenRequestDto,
  LoginResponseDto,
} from './dtos';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { CookieNames } from '@enums';
import { CreateUserRequestDto, UserResponseDto } from '@user/dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @ApiOperation({ description: 'Register new user' })
  @ApiConflictResponse({ description: 'User already exists' })
  @Post('/register')
  public createUser(
    @Body() UserDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.authService.register(UserDto);
  }

  @ApiOperation({ description: 'User authentication' })
  @ApiOkResponse({ description: 'Successfully authenticated user' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/login')
  async login(
    @Body() authCredentialsDto: AuthCredentialsRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto> {
    const token = await this.authService.login(authCredentialsDto);
    response
      .cookie(CookieNames.REFRESH_TOKEN, token.refreshToken, {
        // Valid for 30 day
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
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
  async getNewToken(@Req() request: Request): Promise<LoginResponseDto> {
    const refreshToken = request.cookies(CookieNames.REFRESH_TOKEN);
    const token = await this.tokenService.generateRefreshToken(refreshToken);
    return {
      accessToken: token.accessToken,
    };
  }

  @ApiOperation({ description: 'Validate token' })
  @ApiOkResponse({ description: 'Validation was successful' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('/token/validate')
  async validateToken(
    @Body() validateToken: ValidateTokenRequestDto,
  ): Promise<ValidateTokenResponseDto> {
    const { token } = validateToken;
    return this.tokenService.validateToken(token);
  }
}
