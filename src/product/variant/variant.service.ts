import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { nanoid } from 'nanoid';
import { Product } from '@product/schema/product.schema';
import { SizeValue } from '@size/schema/size-value.schema';
import { Color } from '@color/schema/color.schema';
import { ProductSize } from '@product/schema/product-size.schema';
import { ProductColor } from '@product/schema/product-color.schema';
import { CreateVariantRequestDto, VariantResponsetDto } from './dto';
import { KKNotFoundException } from '@http/exceptions';
import { Variant } from './schema/variant.schema';
import { VariantMapper } from './variant.mapper';

/**
 * Scenario: Product A of size B, color C, and material D with 5 quantity in stock.
 * - This is a variant of Product A.
 * - To list all available sizes of Product A
 *   - Check all variants for this product that are in-stock and collect their sizes.
 * - To list all available colors of Product A
 *   - Check all variants for product A that are in-stock; collect their colors.
 * - To list all available materials for Product A
 *   - Check all variants for product A that are in-stock; collect their materials.
 *
 * - List all variants for this product of color red
 * - List all variants for this product for a material type.
 * - List all products(variants) of color red
 * - List all products(variants) of size 51
 * - List all Products(variants) of material(fabric) M
 */

// - When I create a variant (with specific size and color) I input number in stock.
// - When I want to list available sizes for a product, I loop through all variants that are in stock and return their colors, sizes and materials
// - To check total number of products available add all available variants * quantities in stock.
// List available product sizes
// - check for product in product-sizes whose stock is zero.
// - when creating a product-size, increase the stock by 1
//   - product-size is created when a variant with product-size is created.

@Injectable()
export class VariantService {
  constructor(
    @InjectModel(Color.name) private readonly colorModel: Model<Color>,
    @InjectModel(SizeValue.name)
    private readonly sizeValueModel: Model<SizeValue>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(ProductSize.name)
    private readonly productSizeModel: Model<ProductSize>,
    @InjectModel(ProductColor.name)
    private readonly productColorModel: Model<ProductColor>,
    @InjectModel(Variant.name)
    private readonly variantModel: Model<Variant>,
  ) {}

  public async create(
    createVariantRequestDto: CreateVariantRequestDto,
  ): Promise<VariantResponsetDto> {
    const { product, productColor, productSize, price, imageUrls } =
      createVariantRequestDto;

    const productExists = await this.productModel.findById(product);
    if (!productExists) {
      throw new KKNotFoundException('product');
    }

    const productColorExist = await this.productColorModel.findById(
      productColor,
    );

    if (!productColorExist) {
      throw new KKNotFoundException('productColor');
    }
    const productSizeExists = await this.productSizeModel.findById(productSize);

    if (!productSizeExists) {
      throw new KKNotFoundException('productSize');
    }
    const sku = nanoid(5).toUpperCase();

    const newVariant = await this.variantModel.create({
      price,
      productSize,
      product,
      productColor,
      imageUrls,
      sku,
    });
    return VariantMapper.toDto(newVariant);
  }
}
