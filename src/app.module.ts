import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './user/user.module';
import { AccessModule } from './access/access.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CurrencyModule } from './currency/currency.module';
import { ColorModule } from './color/color.module';
import { ProductModule } from './product/product.module';
import { LibModule } from './lib/lib.module';
import { SizeModule } from './size/size.module';
import { DBConnectionModule } from '@database/db-connection.module';
import { HttpExceptionFilter } from '@http/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DBConnectionModule.register(),
    DatabaseModule,
    UsersModule,
    AccessModule,
    AuthModule,
    CompanyModule,
    CurrencyModule,
    ColorModule,
    ProductModule,
    LibModule,
    SizeModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
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
