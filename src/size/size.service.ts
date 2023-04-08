import { PaginationQueryDto } from '@common';
import {
  SizeDoesNotExistsException,
  SizeExistsException,
} from '@http/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateSizeRequestDto,
  SizeResponseDto,
  UpdateSizeRequestDto,
} from './dto';
import { ISize } from './interface/size.interface';
import { Size } from './schema/size.schema';
import { SizeMapper } from './size.mapper';

@Injectable()
export class SizeService {
  constructor(
    @InjectModel(Size.name) private readonly sizeModel: Model<Size>,
  ) {}
  public async createCurrency(
    createSizeRequestDto: CreateSizeRequestDto,
  ): Promise<SizeResponseDto> {
    const code = createSizeRequestDto.type.toLowerCase();
    const sizeExists: ISize = await this.sizeModel.findOne({
      code,
    });
    if (sizeExists) {
      throw new SizeExistsException(code);
    }

    const newCurrency = await this.sizeModel.create({
      type: createSizeRequestDto.type,
      value: createSizeRequestDto.value,
    });
    return SizeMapper.toDto(newCurrency);
  }

  public async update(
    id: string,
    updateCurrencyRequestDto: UpdateSizeRequestDto,
  ): Promise<SizeResponseDto> {
    try {
      const updatedSize: ISize = await this.sizeModel.findByIdAndUpdate(
        id,
        updateCurrencyRequestDto,
      );
      return SizeMapper.toDto(updatedSize);
    } catch (e) {
      throw new SizeDoesNotExistsException();
    }
  }

  public async fetchCurrencyById(id: string): Promise<SizeResponseDto> {
    const currency: ISize = await this.sizeModel.findById(id);
    if (!currency) {
      throw new SizeDoesNotExistsException();
    }
    return SizeMapper.toDto(currency);
  }

  public async fetchCurrencies(
    paginationQuery: PaginationQueryDto,
  ): Promise<SizeResponseDto[]> {
    const { limit, offset } = paginationQuery;
    const currencies: ISize[] = await this.sizeModel
      .find()
      .skip(offset)
      .limit(limit);
    if (currencies.length) {
      return currencies.map((_currency) => SizeMapper.toDto(_currency));
    }
    return [];
  }
}
