import { Injectable } from '@nestjs/common';
import Cart from '../domain/cart';

@Injectable()
export default class CartRepository {
  private static cart = new Cart();

  get() {
    return CartRepository.cart;
  }

  save(cart: Cart) {
    CartRepository.cart = cart;
    return cart;
  }
}
