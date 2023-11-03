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

import {
  PermissionActionsTypes,
  PermissionResources,
} from '@access/permission/interfaces/permission.interface';
import { JwtGuard } from '@auth/guards';
import { PermissionGuard } from '@auth/guards/permissions.guard';
import { PaginationResponseDto, ResponseDto } from '@pagination';
import { ShirtQueryWithFilterDto } from './dto/shirt-query.dto';
import { ShirtStyleService } from './shirt-style.service';
import { ShirtStyleResponseDto } from './dto/shirt-style-response.dto';
import { CreateShirtStyleDto } from './dto/create-shirt-style.dto';
import { UpdateShirtStyleDto } from './dto/update-shirt-style.dto';

@Controller('shirt-styles')
@UseGuards(JwtGuard)
export class ShirtStyleController {
  constructor(private shirtStyleService: ShirtStyleService) {}
  @ApiOperation({ description: 'Get a paginated Shirt styles list' })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @Permission({
    resource: PermissionResources.SHIRT,
    action: PermissionActionsTypes.READ,
  })
  @UseGuards(PermissionGuard)
  @Get()
  public fetch(
    @Query() paginationQuery: ShirtQueryWithFilterDto,
  ): Promise<PaginationResponseDto<ShirtStyleResponseDto[]>> {
    return this.shirtStyleService.fetchShirtStyles(paginationQuery);
  }

  @ApiOperation({ description: 'Get ShirtStyle by id' })
  @Permission({
    resource: PermissionResources.SHIRT,
    action: PermissionActionsTypes.READ,
  })
  @UseGuards(PermissionGuard)
  @Get('/:id')
  public getShirtStyleById(
    @Param('id') id: string,
  ): Promise<ShirtStyleResponseDto> {
    return this.shirtStyleService.fetchShirtStyleById(id);
  }

  @ApiOperation({
    description: 'Create new Shirt',
  })
  @ApiConflictResponse({ description: 'Shirt exists' })
  @Permission({
    resource: PermissionResources.SHIRT,
    action: PermissionActionsTypes.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public async create(
    @Body() shirtStyleDto: CreateShirtStyleDto,
  ): Promise<ResponseDto<ShirtStyleResponseDto>> {
    const data = await this.shirtStyleService.create(shirtStyleDto);
    return {
      status: 201,
      data,
      message: 'success',
    };
  }

  @ApiOperation({ description: 'Update Shirt style by id' })
  @ApiBadRequestResponse({
    description: "There's no Shirt style with specified id",
  })
  @Permission({
    resource: PermissionResources.SHIRT,
    action: PermissionActionsTypes.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public update(
    @Param('id') id: string,
    @Body() shirtDto: UpdateShirtStyleDto,
  ): Promise<ShirtStyleResponseDto> {
    return this.shirtStyleService.update(id, shirtDto);
  }
}
