import { v4 as uuidv4 } from 'uuid';
import Product from './product';

export class CartItem {
  readonly id: string;
  readonly product: Product;
  readonly cost: number;

  constructor(params: { id?: string; product: Product; cost: number }) {
    this.id = params.id || uuidv4();
    this.product = params.product;
    this.cost = params.cost;
  }

  updateCost(cost: number): CartItem {
    return new CartItem({ ...this, cost });
  }
}

export default class Cart {
  private static readonly TAKE_FREE_ITEM_QUANTITY = 3;

  readonly items: CartItem[];
  readonly total: number;

  constructor(params?: { items: CartItem[]; total?: number }) {
    this.items = params?.items || [];
    this.total = params?.total || 0;
  }

  add(product: Product): Cart {
    return new Cart({
      items: [...this.items, new CartItem({ product, cost: product.price })],
    });
  }

  remove(itemId: string): Cart {
    return new Cart({
      items: this.items.filter((item) => item.id !== itemId),
    });
  }

  close(): Cart {
    let takeFreeQuantity = Math.floor(
      this.items.length / Cart.TAKE_FREE_ITEM_QUANTITY,
    );

    const calculatedItems = this.items
      .sort((a, b) => a.product.price - b.product.price)
      .map((item) => {
        if (takeFreeQuantity) {
          takeFreeQuantity--;
          return item.updateCost(0);
        }

        return item;
      });

    const total = calculatedItems.reduce((acc, curr) => acc + curr.cost, 0);

    return new Cart({
      ...this,
      items: calculatedItems,
      total,
    });
  }
}
