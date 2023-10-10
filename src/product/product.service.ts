import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './schema/product.schema';
import { Category } from './category/schema/category.schema';
import {
  CreateProductRequestDto,
  ProductResponseDto,
  UpdateProductRequestDto,
} from './dto';
import { ProductMapper } from './product.mapper';
import { KKConflictException, KKNotFoundException } from '@http/exceptions';
import { PaginationQueryDto } from '@common';
import { IProduct } from './interface/product.interface';
import { ICategory } from './category/interface/category.interface';
import { Pagination, PaginationResponseDto } from '@pagination';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  /**
   * Product creation flow
   * To create a product
   * Select from a category list to determine product's category
   * If the category does not exist create a category, add to the list and select it.
   * upload product image.
   */
  public async create(
    createProductRequestDto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    const name = createProductRequestDto.name;
    const category = createProductRequestDto.category;
    const categoryExists: ICategory = await this.categoryModel.findById(
      category,
    );
    if (!categoryExists) {
      throw new KKNotFoundException('category');
    }
    const productExists: IProduct = await this.productModel.findOne({
      name,
    });
    if (productExists) {
      throw new KKConflictException('product');
    }

    const newProduct = await this.productModel.create({
      name,
      description: createProductRequestDto.description,
      imageUrl: createProductRequestDto.imageUrl,
      category: categoryExists._id,
    });
    return ProductMapper.toDto(newProduct);
  }

  public async update(
    id: string,
    updateProductRequestDto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    try {
      const updatedProduct: IProduct =
        await this.productModel.findByIdAndUpdate(id, updateProductRequestDto);
      return ProductMapper.toDto(updatedProduct);
    } catch (e) {
      throw new KKNotFoundException('product');
    }
  }

  public async fetchProductById(id: string): Promise<ProductResponseDto> {
    const product: IProduct = await (
      await this.productModel.findById(id)
    ).populated('category');
    if (!product) {
      throw new KKNotFoundException('product');
    }
    return ProductMapper.toDto(product);
  }

  public async fetchProducts(
    paginationQuery,
  ): Promise<PaginationResponseDto<ProductResponseDto[]>> {
    let data = [];
    const { limit, skip, filter } = paginationQuery;
    const totalRecords = await this.productModel.count();
    const products = await this.productModel
      .find({
        ...(filter['$and'].length && { $and: filter['$and'] }),
      })
      .populate('categories', {
        ...(filter?.category && { values: filter?.category }),
      })
      .skip(skip)
      .limit(limit);
    if (products.length) {
      data = products.map((_product) => ProductMapper.toDto(_product));
    }
    return Pagination.of({ limit, skip }, totalRecords, data);
  }
}
