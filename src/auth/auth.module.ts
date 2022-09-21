import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { User, UserSchema } from '@user/schemas/user.schema';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { AuthController } from './auth.controller';
import { TokenModule } from './token.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TokenModule,
  ],
  providers: [AuthService, TokenService, JwtService],
  controllers: [AuthController],
  // exports: [AuthService, TokenService],
})
export class AuthModule {}
