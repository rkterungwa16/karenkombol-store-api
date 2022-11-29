import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency, CurrencySchema } from './schema/currency.schema';
import { TokenService } from 'src/auth/token.service';
import { User, UserSchema } from '@user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import {
  Permission,
  PermissionSchema,
} from '@access/permission/schema/permission.schema';
import { Role, RoleSchema } from '@access/role/schemas/role.schema';
// TODO: understand the scope of injected components. How to make some component components global.
// Do you need to label them global, or if they are exported as parents they are automatically injected in child modules.
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Currency.name, schema: CurrencySchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [CurrencyService, TokenService, JwtService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
