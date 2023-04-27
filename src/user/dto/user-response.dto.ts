import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@enums';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    example: 'karenkombol-ateliers',
  })
  companyName: string;

  @ApiProperty({
    example: 'karen@karenkombol-ateliers.com',
  })
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  status: UserStatus;

  @ApiProperty()
  roles: string[];

  createdAt?: Date;
  updatedAt?: Date;
}
