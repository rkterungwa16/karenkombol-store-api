import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Image, ImageSchema } from './schema/image.schema';
import { PermissionSchema } from '@access/permission/schema/permission.schema';
import { Role, RoleSchema } from '@access/role/schemas/role.schema';
import { Permission } from '@decorators';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@user/schemas/user.schema';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    CloudinaryModule,
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [ImageService, CloudinaryService],
  controllers: [ImageController],
})
export class ImageModule {}
