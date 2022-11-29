import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Currency } from './schema/currency.schema';
import {
  CreateCurrencyRequestDto,
  CurrencyResponseDto,
  UpdateCurrencyRequestDto,
} from './dto';
import { CurrencyMapper } from './currency.mapper';
import {
  CurrencyDoesNotExistsException,
  CurrencyExistsException,
} from '@http/exceptions';
import { PaginationQueryDto } from 'src/common';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency.name) private readonly currencyModel: Model<Currency>,
  ) {}
  public async createCurrency(
    createCurrencyRequestDto: CreateCurrencyRequestDto,
  ): Promise<CurrencyResponseDto> {
    const code = createCurrencyRequestDto.code.toUpperCase();
    const currencyExists = await this.currencyModel.findOne({
      code,
    });
    if (currencyExists) {
      throw new CurrencyExistsException(code);
    }

    const newCurrency = await this.currencyModel.create({
      code,
      symbol: createCurrencyRequestDto.symbol,
      rate: createCurrencyRequestDto.rate,
    });
    return CurrencyMapper.toDto(newCurrency);
  }

  public async update(
    id: string,
    updateCurrencyRequestDto: UpdateCurrencyRequestDto,
  ): Promise<CurrencyResponseDto> {
    try {
      const updatedCurrency = await this.currencyModel.findByIdAndUpdate(
        id,
        updateCurrencyRequestDto,
      );
      return CurrencyMapper.toDto(updatedCurrency);
    } catch (e) {
      throw new CurrencyDoesNotExistsException();
    }
  }

  public async fetchCurrencyById(id: string): Promise<CurrencyResponseDto> {
    const currency = await this.currencyModel.findById(id);
    if (!currency) {
      throw new CurrencyDoesNotExistsException();
    }
    return CurrencyMapper.toDto(currency);
  }

  public async fetchCurrencies(
    paginationQuery: PaginationQueryDto,
  ): Promise<CurrencyResponseDto[]> {
    const { limit, offset } = paginationQuery;
    const currencies = await this.currencyModel
      .find()
      .skip(offset)
      .limit(limit);
    if (currencies.length) {
      return currencies.map((_currency) => CurrencyMapper.toDto(_currency));
    }
    return [];
  }
}
