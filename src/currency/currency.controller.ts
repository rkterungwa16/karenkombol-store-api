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
  @ApiOperation({ description: 'Get a paginated currency list' })
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
  public fetchCurrencies(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<CurrencyResponseDto[]> {
    return this.currencyService.fetchCurrencies(paginationQuery);
  }

  @ApiOperation({ description: 'Get currency by id' })
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

  @ApiOperation({
    description:
      'Create new currency, assign your shop base currency a rate of 1. Assign all other currencies the equivalent of the base currency rate. Example 1NGN = 0.00142 USD',
  })
  @ApiConflictResponse({ description: "There's a currency with code NGN" })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.CREATE,
  })
  @UseGuards(PermissionGuard)
  @Post()
  public createCurrency(
    @Body(ValidationPipe) currencyDto: CreateCurrencyRequestDto,
  ): Promise<CurrencyResponseDto> {
    return this.currencyService.createCurrency(currencyDto);
  }

  @ApiOperation({ description: 'Update currency by id' })
  @ApiBadRequestResponse({
    description: "There's no currency with specified id",
  })
  @Permission({
    resource: PermissionResources.CURRENCIES,
    action: PermissionActions.UPDATE,
  })
  @UseGuards(PermissionGuard)
  @Put('/:id')
  public updateCurrency(
    @Param('id') id: string,
    @Body(ValidationPipe) currencyDto: UpdateCurrencyRequestDto,
  ): Promise<CurrencyResponseDto> {
    return this.currencyService.update(id, currencyDto);
  }
}
