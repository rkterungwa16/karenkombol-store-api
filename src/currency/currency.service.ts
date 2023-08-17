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
import { KKConflictException, KKNotFoundException } from '@http/exceptions';
import { PaginationQueryDto } from '@common';
import { ICurrency } from './interface/currency.interface';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency.name) private readonly currencyModel: Model<Currency>,
  ) {}
  public async createCurrency(
    createCurrencyRequestDto: CreateCurrencyRequestDto,
  ): Promise<CurrencyResponseDto> {
    const code = createCurrencyRequestDto.code.toUpperCase();
    const currencyExists: ICurrency = await this.currencyModel.findOne({
      code,
    });
    if (currencyExists) {
      throw new KKConflictException('currency');
    }

    const newCurrency = await this.currencyModel.create({
      code,
      symbol: createCurrencyRequestDto.symbol,
      rate: createCurrencyRequestDto.rate,
      ...(createCurrencyRequestDto?.status && {
        status: createCurrencyRequestDto.status,
      }),
    });
    return CurrencyMapper.toDto(newCurrency);
  }

  public async update(
    id: string,
    updateCurrencyRequestDto: UpdateCurrencyRequestDto,
  ): Promise<CurrencyResponseDto> {
    try {
      const updatedCurrency: ICurrency =
        await this.currencyModel.findByIdAndUpdate(
          id,
          updateCurrencyRequestDto,
        );
      return CurrencyMapper.toDto(updatedCurrency);
    } catch (e) {
      throw new KKNotFoundException('currency');
    }
  }

  public async fetchCurrencyById(id: string): Promise<CurrencyResponseDto> {
    const currency: ICurrency = await this.currencyModel.findById(id);
    if (!currency) {
      throw new KKNotFoundException('currency');
    }
    return CurrencyMapper.toDto(currency);
  }

  public async fetchCurrencies(
    paginationQuery: PaginationQueryDto,
  ): Promise<CurrencyResponseDto[]> {
    const { limit, offset } = paginationQuery;
    const currencies: ICurrency[] = await this.currencyModel
      .find()
      .skip(offset)
      .limit(limit);
    if (currencies.length) {
      return currencies.map((_currency) => CurrencyMapper.toDto(_currency));
    }
    return [];
  }
}
