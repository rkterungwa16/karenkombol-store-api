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
import {
  CategoryDoesNotExistsException,
  ProductDoesNotExistsException,
  ProductExistsException,
} from '@http/exceptions';
import { PaginationQueryDto } from '@common';
import { IProduct } from './interface/product.interface';
import { ICategory } from './category/interface/category.interface';

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
    const name = createProductRequestDto.name.toLowerCase();
    const category = createProductRequestDto.category;
    const categoryExists: ICategory = await this.categoryModel.findById(
      category,
    );
    if (!categoryExists) {
      throw new CategoryDoesNotExistsException();
    }
    const productExists: IProduct = await this.productModel.findOne({
      name,
    });
    if (productExists) {
      throw new ProductExistsException();
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
      throw new ProductDoesNotExistsException();
    }
  }

  public async fetchProductById(id: string): Promise<ProductResponseDto> {
    const product: IProduct = await (
      await this.productModel.findById(id)
    ).populated('category');
    if (!product) {
      throw new ProductDoesNotExistsException();
    }
    return ProductMapper.toDto(product);
  }

  public async fetchCategories(
    paginationQuery: PaginationQueryDto,
  ): Promise<ProductResponseDto[]> {
    const { limit, offset } = paginationQuery;
    const products: IProduct[] = await this.productModel
      .find()
      .populate('category')
      .skip(offset)
      .limit(limit);
    if (products.length) {
      return products.map((_product) => ProductMapper.toDto(_product));
    }
    return [];
  }
}
