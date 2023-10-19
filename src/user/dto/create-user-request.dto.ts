import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
  Length,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const specialCharacters = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
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
  // @Matches(specialCharacters, {
  //   message: 'password must contain special characters',
  // })
  @Length(6, 20)
  @ApiProperty({
    example: 'Hello123',
  })
  password: string;
}
