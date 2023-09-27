import Product from '../domain/product';

export default class ProductRepository {
  private static readonly PRODUCTS: Product[] = [
    { id: 1, description: 'T-shirt', price: 1299 },
    { id: 2, description: 'Jeans', price: 2500 },
    { id: 3, description: 'Dress', price: 2065 },
  ];

  find(id: number) {
    return ProductRepository.PRODUCTS.find((product) => product.id === id);
  }
}
