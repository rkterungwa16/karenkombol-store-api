import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company, CompanySchema } from './schema/company.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenService } from '@auth/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  // providers: [CompanyService, TokenService, JwtService],
  controllers: [CompanyController],
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
})
export class CompanyModule {}
