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
  ValidationPipe,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiQuery,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { Permission } from '@decorators';

import {
  CurrencyResponseDto,
  CreateCurrencyRequestDto,
  UpdateCurrencyRequestDto,
} from './dto';

import { CurrencyService } from './currency.service';
import {
  PermissionActions,
  PermissionResources,
} from '@access/permission/interfaces/permission.interface';
import { PaginationQueryDto } from 'src/common';
import { JwtGuard } from 'src/auth/guards';
import { PermissionGuard } from 'src/auth/guards/permissions.guard';

@Controller('currency')
@UseGuards(JwtGuard)
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}
  @ApiOperation({ description: 'Get a paginated role list' })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.READ,
  })
  @UseGuards(PermissionGuard)
  @Get()
  public fetchRoles(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<CurrencyResponseDto[]> {
    return this.currencyService.fetchCurrencies(paginationQuery);
  }

  @ApiOperation({ description: 'Get role by id' })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.READ,
  })
  @UseGuards(PermissionGuard)
  @Get('/:id')
  public getCurrencyById(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<CurrencyResponseDto> {
    return this.currencyService.fetchCurrencyById(id);
  }

  @ApiOperation({ description: 'Create new role' })
  @ApiConflictResponse({ description: "There's a role with name admin" })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public createCurrency(
    @Body(ValidationPipe) roleDto: CreateCurrencyRequestDto,
  ): Promise<CurrencyResponseDto> {
    return this.currencyService.createCurrency(roleDto);
  }

  @ApiOperation({ description: 'Update role by id' })
  @ApiBadRequestResponse({ description: "There's no role with specified id" })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public updateCurrency(
    @Param('id') id: string,
    @Body(ValidationPipe) roleDto: UpdateCurrencyRequestDto,
  ): Promise<CurrencyResponseDto> {
    return this.currencyService.update(id, roleDto);
  }
}
