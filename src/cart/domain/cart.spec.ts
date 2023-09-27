import Cart from './cart';

jest.mock('uuid', () => ({ v4: () => 'uuid' }));

describe('Cart', () => {
  describe('add', () => {
    it('increments cart items with new item', () => {
      const cart = new Cart();

      const updatedCart = cart.add({
        id: 1,
        description: 'product',
        price: 1100,
      });

      expect(updatedCart).toMatchObject(
        new Cart({
          items: [
            {
              id: 'uuid',
              product: { id: 1, description: 'product', price: 1100 },
              cost: 1100,
            },
          ],
        }),
      );
    });
  });

  describe('remove', () => {
    it('removes one item from the cart', () => {
      const cart = new Cart({
        items: [
          {
            id: 'uuid-01',
            product: { id: 1, description: 'product', price: 1100 },
            cost: 1100,
          },
          {
            id: 'uuid-02',
            product: { id: 1, description: 'product', price: 1100 },
            cost: 1100,
          },
        ],
      });

      expect(cart.remove('uuid-02')).toMatchObject(
        new Cart({
          items: [
            {
              id: 'uuid-01',
              product: { id: 1, description: 'product', price: 1100 },
              cost: 1100,
            },
          ],
        }),
      );
    });
  });

  describe('close', () => {
    it('calculates cart total', () => {
      const cart = new Cart({
        items: [
          {
            id: 'uuid-01',
            product: { id: 1, description: 'product', price: 1100 },
            cost: 1100,
          },
          {
            id: 'uuid-02',
            product: { id: 1, description: 'product', price: 1100 },
            cost: 1100,
          },
        ],
      });

      expect(cart.close()).toMatchObject({ total: 2200 });
    });

    it('makes lowest item free if buying 3 items', () => {
      const cart = new Cart({
        items: [
          {
            id: 'uuid-01',
            product: { id: 1, description: 'product', price: 1100 },
            cost: 1100,
          },
          {
            id: 'uuid-02',
            product: { id: 1, description: 'product', price: 1100 },
            cost: 1100,
          },
          {
            id: 'uuid-03',
            product: { id: 2, description: 'product-b', price: 1000 },
            cost: 1000,
          },
        ],
      });

      expect(cart.close()).toMatchObject({
        items: [
          {
            id: 'uuid-03',
            product: { id: 2, description: 'product-b', price: 1000 },
            cost: 0,
          },
          {
            id: 'uuid-01',
            product: { id: 1, description: 'product', price: 1100 },
            cost: 1100,
          },
          {
            id: 'uuid-02',
            product: { id: 1, description: 'product', price: 1100 },
            cost: 1100,
          },
        ],
        total: 2200,
      });
    });
  });
});
