import { Module } from '@nestjs/common';
import { databaseProviders } from './database.service';

@Module({
  imports: [...databaseProviders],
})
export class DatabaseModule {}
