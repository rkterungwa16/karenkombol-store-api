import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { User, UserSchema } from '@user/schemas/user.schema';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { AuthController } from './auth.controller';
import { TokenModule } from './token.module';
import { PermissionSchema } from '@access/permission/schema/permission.schema';
import { Role, RoleSchema } from '@access/role/schemas/role.schema';
import { Company, CompanySchema } from '@company/schema/company.schema';
import { Permission } from '@decorators';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    TokenModule,
  ],
  providers: [AuthService, TokenService, JwtService],
  controllers: [AuthController],
  // exports: [AuthService, TokenService],
})
export class AuthModule {}
