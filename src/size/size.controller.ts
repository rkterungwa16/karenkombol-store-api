import {
  PermissionResources,
  PermissionActions,
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
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiConflictResponse,
  ApiQuery,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { extractPaginationDetails } from '@pagination';
import {
  AddSizeValueRequestDto,
  CreateSizeRequestDto,
  SizeResponseDto,
  UpdateSizeRequestDto,
} from './dto';
import { SizeQueryDto } from './dto/size-query.dto';
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
    action: PermissionActions.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public createSize(
    @Body(new ValidationPipe()) sizeDto: CreateSizeRequestDto,
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
    action: PermissionActions.READ,
  })
  @UseGuards(PermissionGuard)
  @Get()
  public fetchSizes(
    @Query(new ValidationPipe()) sizeQueryDto: SizeQueryDto,
  ): Promise<SizeResponseDto[]> {
    const pagination = extractPaginationDetails(sizeQueryDto);
    return this.sizeService.fetchSizes(pagination);
  }

  @ApiOperation({ description: 'Update size by id' })
  @ApiBadRequestResponse({
    description: "There's no size of type",
  })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public updateSize(
    @Param('id') id: string,
    @Body(new ValidationPipe()) sizeDto: UpdateSizeRequestDto,
  ): Promise<SizeResponseDto> {
    console.log('size dto', sizeDto);
    return this.sizeService.update(id, sizeDto);
  }

  @ApiOperation({ description: 'Update size by id' })
  @ApiBadRequestResponse({
    description: "There's no size of type",
  })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Patch('/:id/add')
  public addSizeValue(
    @Param('id') id: string,
    @Body(new ValidationPipe()) sizeDto: AddSizeValueRequestDto,
  ): Promise<SizeResponseDto> {
    return this.sizeService.addValueToSize(id, sizeDto);
  }
}
