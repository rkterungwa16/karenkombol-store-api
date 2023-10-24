import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { User, UserSchema } from '@user/schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from '@user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('TOKEN_SECRET'),
        signOptions: {
          expiresIn: config.get('ACCESS_TOKEN_EXPIRES_IN'),
        },
        algorithm: 'HS256',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TokenService, UsersService],
  exports: [TokenService],
})
export class TokenModule {}
