import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import Cart, { CartItem } from '../domain/cart';
import { CartService } from '../domain/cart.service';
import { CartController } from './cart.controller';

jest.mock('../domain/cart.service');

describe('CartController', () => {
  let app: INestApplication;
  const CartServiceMock = CartService as jest.MockedClass<typeof CartService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartServiceMock],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /cart/item', () => {
    CartServiceMock.prototype.add.mockReturnValueOnce(
      new Cart({
        items: [
          new CartItem({
            id: 'uuid',
            product: { id: 1, description: 'product', price: 1544 },
            cost: 1544,
          }),
        ],
      }),
    );

    return request(app.getHttpServer())
      .post('/cart/item')
      .send({
        productId: 1,
      })
      .then((response) => {
        expect(response.status).toEqual(201);
        expect(CartServiceMock.prototype.add).toHaveBeenCalledWith(1);
        expect(response.body).toMatchObject({
          items: [
            {
              id: 'uuid',
              product: { id: 1, description: 'product', price: 1544 },
              cost: 1544,
            },
          ],
        });
      });
  });

  it('DELETE /cart/item/:id', () => {
    return request(app.getHttpServer())
      .delete('/cart/item/uuid')
      .send()
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(CartServiceMock.prototype.remove).toHaveBeenCalledWith('uuid');
      });
  });

  it('POST /cart/close', () => {
    CartServiceMock.prototype.close.mockReturnValueOnce(
      new Cart({
        items: [
          new CartItem({
            id: 'uuid',
            product: { id: 1, description: 'product', price: 9999 },
            cost: 9999,
          }),
        ],
        total: 9999,
      }),
    );

    return request(app.getHttpServer())
      .post('/cart/close')
      .send()
      .then((response) => {
        expect(response.status).toEqual(201);
        expect(response.body).toMatchObject({
          items: [
            {
              id: 'uuid',
              product: { id: 1, description: 'product', price: 9999 },
              cost: 9999,
            },
          ],
          total: 9999,
        });
      });
  });
});
