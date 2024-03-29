import {
  PermissionResources,
  PermissionActionsTypes,
} from '@access/permission/interfaces/permission.interface';
import { PermissionGuard } from '@auth/guards/permissions.guard';
import { Permission } from '@decorators';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiConflictResponse,
  ApiQuery,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { PaginationResponseDto } from '@pagination';
import {
  AddSizeValueRequestDto,
  CreateSizeRequestDto,
  SizeResponseDto,
  UpdateSizeRequestDto,
} from './dto';
import { SizeQueryWithFilterDto } from './dto/size-query.dto';
import { SizeService } from './size.service';

@Controller('size')
export class SizeController {
  constructor(private sizeService: SizeService) {}

  @ApiOperation({
    description: 'Create new size of type and value',
  })
  @ApiConflictResponse({ description: "There's a size of type" })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActionsTypes.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public createSize(
    @Body() sizeDto: CreateSizeRequestDto,
  ): Promise<SizeResponseDto> {
    return this.sizeService.createSize(sizeDto);
  }

  @ApiOperation({ description: 'Get a paginated currency list' })
  @ApiQuery({
    name: 'name',
    type: 'string',
    required: false,
    example: 'French size',
  })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActionsTypes.READ,
  })
  @UseGuards(PermissionGuard)
  @Get()
  public fetchSizes(
    @Query() sizeQueryDto: SizeQueryWithFilterDto,
  ): Promise<PaginationResponseDto<SizeResponseDto[]>> {
    const filter = sizeQueryDto.filter();
    const { skip, limit, page } = sizeQueryDto;
    return this.sizeService.fetchSizes({ limit, skip, page, filter });
  }

  @ApiOperation({ description: 'Update size by id' })
  @ApiBadRequestResponse({
    description: "There's no size of type",
  })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActionsTypes.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public updateSize(
    @Param('id') id: string,
    @Body() sizeDto: UpdateSizeRequestDto,
  ): Promise<SizeResponseDto> {
    return this.sizeService.update(id, sizeDto);
  }

  @ApiOperation({ description: 'Update size by id' })
  @ApiBadRequestResponse({
    description: "There's no size of type",
  })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActionsTypes.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Patch('/:id/add')
  public addSizeValue(
    @Param('id') id: string,
    @Body() sizeDto: AddSizeValueRequestDto,
  ): Promise<SizeResponseDto> {
    return this.sizeService.addValueToSize(id, sizeDto);
  }
}
