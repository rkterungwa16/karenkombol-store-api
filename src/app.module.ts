import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './user/user.module';
import { AccessModule } from './access/access.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CurrencyModule } from './currency/currency.module';
import { VariantModule } from './variant/variant.module';
import { ColorModule } from './color/color.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AccessModule,
    AuthModule,
    CompanyModule,
    CurrencyModule,
    VariantModule,
    ColorModule,
  ],
})
export class AppModule {
  static port: number;
  static apiVersion: string;
  static apiPrefix: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('API_PORT');
    AppModule.apiVersion = this.configService.get('API_VERSION');
    AppModule.apiPrefix = this.configService.get('API_PREFIX');
  }
}
