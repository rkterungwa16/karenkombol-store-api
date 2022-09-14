import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  Matches,
  Length,
  IsAlphanumeric,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export class CreateUserRequestDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty({
    example: 'karenkombol-ateliers',
  })
  companyName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'karen@karenkombol-ateliers.com',
  })
  email: string;

  @Matches(passwordRegex, { message: 'Password too weak' })
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(6, 20)
  @ApiProperty({
    example: 'Hello123',
  })
  password: string;
}
