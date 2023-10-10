import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@user/user.module';
import { TokenModule } from '@auth/token.module';
import { PermissionModule } from '@access/permission/permission.module';
import { CompanyModule } from '@company/company.module';

@Module({
  imports: [
    PermissionModule,
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    UsersModule,
    TokenModule,
    JwtModule,
    CompanyModule,
  ],
  providers: [RoleService],
  controllers: [RoleController],
  // TODO: The idea is to make these components available to all modules that depend on it in the application.
  exports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    RoleService,
  ],
})
export class RoleModule {}
