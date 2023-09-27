import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import Cart from '../domain/cart';
import { CartService } from '../domain/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly service: CartService) {}

  @Post('/item')
  async add(@Body() { productId }: { productId: number }): Promise<Cart> {
    return this.service.add(productId);
  }

  @Delete('/item/:id')
  async remove(@Param('id') itemId: string): Promise<void> {
    return this.service.remove(itemId);
  }

  @Post('/close')
  async close(): Promise<Cart> {
    return this.service.close();
  }
}
