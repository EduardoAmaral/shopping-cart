import { Injectable } from '@nestjs/common';
import BusinessException from '../../business.exception';
import CartRepository from '../infrastructure/cart.repository';
import ProductRepository from '../infrastructure/product.repository';
import Cart from './cart';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  add(productId: number): Cart {
    const product = this.productRepository.find(productId);

    if (!product) {
      throw new BusinessException('Invalid product');
    }

    const cart = this.cartRepository.get();

    return this.cartRepository.save(cart.add(product));
  }

  remove(itemId: string): void {
    this.cartRepository.get().remove(itemId);
  }

  close(): Cart {
    const cart = this.cartRepository.get();

    return this.cartRepository.save(cart.close());
  }
}
