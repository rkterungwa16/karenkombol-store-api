import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import {
  Provider,
  Type,
  DynamicModule,
  ForwardReference,
} from '@nestjs/common';

import { SeederModule, SeederModuleOptions } from './seeder.module';
import { SeederService } from './seeder.service';
import { Seeder } from './seeder.interface';
import { DatabaseModule } from '../database/database.module';
import { AccessModule } from '../access/access.module';
import { UsersModule } from '../user/user.module';
import { PermissionsSeeder } from './permission-seeder';
import { PermissionModule } from '@access/permission/permission.module';
import { CategoriesSeeder } from './clothings-seeder';
import { ClothingModule } from '@product/clothing/clothing.module';

export interface SeederOptions {
  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  providers?: Provider[];
}

export interface SeederRunner {
  run(seeders: Provider<Seeder>[]): void;
}

async function bootstrap(options: SeederModuleOptions) {
  const { seeders, ...others } = options;
  const app = await NestFactory.createApplicationContext(
    SeederModule.register(options),
  );
  const seedersService = app.get(SeederService);
  await seedersService.run();

  await app.close();
}

export const seeder = (options: SeederOptions): SeederRunner => {
  return {
    run(seeders: Provider<Seeder>[]): void {
      bootstrap({
        ...options,
        seeders,
      });
    },
  };
};

seeder({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AccessModule,
    PermissionModule,
    ClothingModule,
  ],
}).run([PermissionsSeeder, CategoriesSeeder]);
