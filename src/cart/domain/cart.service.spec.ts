import BusinessException from '../../business.exception';
import CartRepository from '../infrastructure/cart.repository';
import ProductRepository from '../infrastructure/product.repository';
import Cart, { CartItem } from './cart';
import { CartService } from './cart.service';

jest.mock('uuid', () => ({ v4: () => 'uuid' }));

describe('CartService', () => {
  let service: CartService;
  const cartRepository: CartRepository = new CartRepository();
  const productRepository: ProductRepository = new ProductRepository();

  beforeEach(async () => {
    cartRepository.get = jest.fn().mockReturnValueOnce(new Cart({ items: [] }));
    cartRepository.save = jest.fn();
    productRepository.find = jest.fn();

    service = new CartService(cartRepository, productRepository);
  });

  describe('add', () => {
    it('adds a new product into the cart', () => {
      productRepository.find = jest
        .fn()
        .mockReturnValueOnce({ id: 1, description: 'T-shirt', price: 1299 });

      service.add(1);

      expect(cartRepository.save).toHaveBeenCalledWith(
        new Cart({
          items: [
            new CartItem({
              id: 'uuid',
              product: { id: 1, description: 'T-shirt', price: 1299 },
              cost: 1299,
            }),
          ],
        }),
      );
    });

    it('throws BusinessException if given product is NOT available', () => {
      expect(() => service.add(1)).toThrowError(
        new BusinessException('Invalid product'),
      );
    });
  });
});
