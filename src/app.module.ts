import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './user/user.module';
import { AccessModule } from './access/access.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CurrencyController } from './currency/currency.controller';
import { CurrencyService } from './currency/currency.service';

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
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
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
