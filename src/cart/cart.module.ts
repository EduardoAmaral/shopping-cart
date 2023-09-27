import { Module } from '@nestjs/common';
import CartRepository from './infrastructure/cart.repository';
import ProductRepository from './infrastructure/product.repository';
import { CartController } from './application/cart.controller';
import { CartService } from './domain/cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService, CartRepository, ProductRepository]
})
export class CartModule {}
