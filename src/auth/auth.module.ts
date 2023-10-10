import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from './token.module';
import { UsersModule } from '@user/user.module';
import { AccessModule } from '@access/access.module';
import { CompanyModule } from '@company/company.module';
@Module({
  imports: [UsersModule, AccessModule, CompanyModule, JwtModule, TokenModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
