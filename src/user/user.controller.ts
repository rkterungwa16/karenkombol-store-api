import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiConflictResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserResponseDto, CreateUserRequestDto } from './dto';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ description: 'Create new user' })
  @ApiConflictResponse({ description: 'User already exists' })
  @Post()
  // @Permission("users.create")
  public createUser(
    @Body() UserDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.create(UserDto);
  }
}
