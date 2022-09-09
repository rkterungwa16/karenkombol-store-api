import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const mongodbConnection = (configService: ConfigService) => {
  const mapMongodbUrl = {
    development: configService.get<string>('DEV_DATABASE_URL'),
    production: configService.get<string>('PROD_DATABASE_URL'),
    test: configService.get<string>('TEST_DATABASE_URL'),
  };
  const env = configService.get<string>('NODE_ENV');
  return {
    uri: mapMongodbUrl[env],
    useNewUrlParser: true,
  };
};

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: mongodbConnection,
    inject: [ConfigService],
  }),
];
