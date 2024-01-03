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
  ClothingResponseDto,
  CreateClothingDto,
  UpdateClothingDto,
} from './dto';

import { ClothingService } from './clothing.service';
import {
  PermissionActionsTypes,
  PermissionResources,
} from '@access/permission/interfaces/permission.interface';
import { JwtGuard } from '@auth/guards';
import { PermissionGuard } from '@auth/guards/permissions.guard';
import { PaginationResponseDto, ResponseDto } from '@pagination';
import { ClothingQueryWithFilterDto } from './dto/clothing-query.dto';

@Controller('clothings')
@UseGuards(JwtGuard)
export class ClothingController {
  constructor(private clothingService: ClothingService) {}
  @ApiOperation({ description: 'Get a paginated Clothing list' })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @Permission({
    resource: PermissionResources.CLOTHING,
    action: PermissionActionsTypes.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Get()
  public fetch(
    @Query() paginationQuery: ClothingQueryWithFilterDto,
  ): Promise<PaginationResponseDto<ClothingResponseDto[]>> {
    return this.clothingService.fetchClothings(paginationQuery);
  }

  @ApiOperation({ description: 'Get Clothing by id' })
  @Permission({
    resource: PermissionResources.CLOTHING,
    action: PermissionActionsTypes.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Get('/:id')
  public async getClothingById(
    @Param('id') id: string,
  ): Promise<ResponseDto<ClothingResponseDto>> {
    const data = await this.clothingService.fetchClothingById(id);
    return {
      status: 200,
      data,
      message: 'success',
    };
  }

  @ApiOperation({
    description: 'Create new Clothing',
  })
  @ApiConflictResponse({ description: 'Clothing exists' })
  @Permission({
    resource: PermissionResources.CLOTHING,
    action: PermissionActionsTypes.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public async createClothing(
    @Body() ClothingDto: CreateClothingDto,
  ): Promise<ResponseDto<ClothingResponseDto>> {
    const data = await this.clothingService.create(ClothingDto);
    return {
      status: 201,
      data,
      message: 'success',
    };
  }

  @ApiOperation({ description: 'Update Clothing by id' })
  @ApiBadRequestResponse({
    description: "There's no Clothing with specified id",
  })
  @Permission({
    resource: PermissionResources.CLOTHING,
    action: PermissionActionsTypes.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() clothingDto: UpdateClothingDto,
  ): Promise<ResponseDto<ClothingResponseDto>> {
    const data = await this.clothingService.update(id, clothingDto);
    return {
      status: 200,
      data,
      message: 'success',
    };
  }
}
