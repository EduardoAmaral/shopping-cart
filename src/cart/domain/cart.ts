import Product from './product';
import { v4 as uuidv4 } from 'uuid';

export interface CartItem {
  id: string;
  product: Product;
  cost: number;
}

export default class Cart {
  private static readonly TAKE_FREE_ITEM_QUANTITY = 3;

  private readonly items: CartItem[];
  private readonly total: number;

  constructor(params?: { items: CartItem[]; total?: number }) {
    this.items = params?.items || [];
    this.total = params?.total || 0;
  }

  add(product: Product): Cart {
    return new Cart({
      items: [
        ...this.items,
        { id: uuidv4(), product, cost: product.price },
      ],
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
          return { ...item, cost: 0 };
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
