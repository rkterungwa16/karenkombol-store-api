import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { Company, CompanySchema } from './schema/company.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // providers: [CompanyService, TokenService, JwtService],
  controllers: [CompanyController],
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
})
export class CompanyModule {}
