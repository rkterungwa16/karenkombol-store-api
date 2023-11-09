import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiQuery,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { Permission } from '@decorators';

import { CreateShirtDto } from './dto';

import { ShirtService } from './shirt.service';
import {
  PermissionActionsTypes,
  PermissionResources,
} from '@access/permission/interfaces/permission.interface';
import { JwtGuard } from '@auth/guards';
import { PermissionGuard } from '@auth/guards/permissions.guard';
import { PaginationResponseDto, ResponseDto } from '@pagination';
import { UpdateShirtDto } from './dto/update-shirt.dto';
import { ShirtResponseDto } from './dto/shirt-response.dto';
import { ShirtQueryWithFilterDto } from './dto/shirt-query.dto';

@Controller('shirts')
@UseGuards(JwtGuard)
export class ShirtController {
  constructor(private shirtService: ShirtService) {}
  @ApiOperation({ description: 'Get a paginated Shirt list' })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @Permission({
    resource: PermissionResources.SHIRTS,
    action: PermissionActionsTypes.READ,
  })
  @UseGuards(PermissionGuard)
  @Get()
  public fetch(
    @Query() paginationQuery: ShirtQueryWithFilterDto,
  ): Promise<PaginationResponseDto<ShirtResponseDto[]>> {
    return this.shirtService.fetchShirts(paginationQuery);
  }

  @ApiOperation({ description: 'Get Shirt by id' })
  @Permission({
    resource: PermissionResources.SHIRTS,
    action: PermissionActionsTypes.READ,
  })
  @UseGuards(PermissionGuard)
  @Get('/:id')
  public getShirtById(@Param('id') id: string): Promise<ShirtResponseDto> {
    return this.shirtService.fetchShirtById(id);
  }

  @ApiOperation({
    description: 'Create new Shirt',
  })
  @ApiConflictResponse({ description: 'Shirt exists' })
  @Permission({
    resource: PermissionResources.SHIRTS,
    action: PermissionActionsTypes.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public async createShirt(
    @Body() shirtDto: CreateShirtDto,
  ): Promise<ResponseDto<ShirtResponseDto>> {
    const data = await this.shirtService.create(shirtDto);
    return {
      status: 201,
      data,
      message: 'success',
    };
  }

  @ApiOperation({ description: 'Update shirt by id' })
  @ApiBadRequestResponse({
    description: "There's no Shirt with specified id",
  })
  @Permission({
    resource: PermissionResources.SHIRTS,
    action: PermissionActionsTypes.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public update(
    @Param('id') id: string,
    @Body() shirtDto: UpdateShirtDto,
  ): Promise<ShirtResponseDto> {
    return this.shirtService.update(id, shirtDto);
  }
}
