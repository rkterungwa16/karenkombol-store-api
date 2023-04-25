import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
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
  ColorResponseDto,
  CreateColorRequestDto,
  UpdateColorRequestDto,
} from './dto';

import { ColorService } from './color.service';
import {
  PermissionActions,
  PermissionResources,
} from '@access/permission/interfaces/permission.interface';
import { PaginationQueryDto } from '@common';
import { JwtGuard } from '@auth/guards';
import { PermissionGuard } from '@auth/guards/permissions.guard';

@Controller('color')
@UseGuards(JwtGuard)
export class ColorController {
  constructor(private colorService: ColorService) {}
  @ApiOperation({ description: 'Get a paginated color list' })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @Permission({
    resource: PermissionResources.COLORS,
    action: PermissionActions.READ,
  })
  @UseGuards(PermissionGuard)
  @Get()
  public fetchColors(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<ColorResponseDto[]> {
    return this.colorService.fetchColors(paginationQuery);
  }

  @ApiOperation({ description: 'Get color by id' })
  @Permission({
    resource: PermissionResources.COLORS,
    action: PermissionActions.READ,
  })
  @UseGuards(PermissionGuard)
  @Get('/:id')
  public getColorById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<ColorResponseDto> {
    return this.colorService.fetchColorById(id);
  }

  @ApiOperation({
    description: 'Create new color',
  })
  @ApiConflictResponse({ description: 'Color already exists' })
  @Permission({
    resource: PermissionResources.COLORS,
    action: PermissionActions.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public create(
    @Body() colorDto: CreateColorRequestDto,
  ): Promise<ColorResponseDto> {
    return this.colorService.createColor(colorDto);
  }

  @ApiOperation({ description: 'Update color by id' })
  @ApiBadRequestResponse({
    description: "There's no color with specified id",
  })
  @Permission({
    resource: PermissionResources.COLORS,
    action: PermissionActions.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public update(
    @Param('id') id: string,
    @Body() colorDto: UpdateColorRequestDto,
  ): Promise<ColorResponseDto> {
    return this.colorService.update(id, colorDto);
  }
}
