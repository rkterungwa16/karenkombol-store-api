import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { mongodbService } from './database.service';
@Module({
  imports: [MongooseModule.forRootAsync(mongodbService)],
  exports: [MongooseModule.forRootAsync(mongodbService)],
})
export class DatabaseModule {}
