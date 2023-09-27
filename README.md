## Description

A quick solution for a shopping cart with a get 3 pay for 2 items campaign.

**Products**

|          ID | Description |  Price   |
| -------------:|:--------:|:-------:|
|     1 | T-shirt | USD 12.99  |
|     2 | Jeans | USD 25.00  |
|     3 | Dress | USD 20.65  |

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Test

```bash
# tests
$ npm run test
```

## Endpoints

### POST /cart/item
```bash
$ curl -X POST localhost:3000/cart/item -H 'Content-Type: application/json' -d '{"productId": 3}'
```

### DELETE /cart/item/:Id
```bash
$ curl -X DELETE localhost:3000/cart/item/:id
```

### POST /cart/close
```bash
$ curl -X POST localhost:3000/cart/close
```

## Architecture & Design

A brief about the architecture and design decisions made on it:

### Hexagonal Architecture
Used to isolate core business logic in domain objects to avoid coupling it with infrastructure and application logics.

### Domain
Product: model used as an interface since there isn’t any business rules related to it from now. Added an identifier to facilitate add/remove operations and avoid ambiguity. Kept the original price since it can be useful to show to customers how much they’re saving when discounts are applied.
Price is being represented as cents (without floating point) as a recommendation to minimize issues with rounding.
Cart:  Represented a shopping cart with add, remove and close operations.
CartItem: Has its own id to facilitate the removal operation. From now, each individual item has an entry, but a quantity attribute could be used to avoid it. It was created as different model since a product has its original price but when put into a cart, it can be modified. So, used “cost” as for the item “price” to avoid ambiguity with the original price from the product.

### Tests
There are two levels of tests on this solution, unit (for business logic) and integration (for controllers). Infrastructure integrations tests were abbreviated as they aren't real structures at this moment.

### Storage
Used in memory storage to facilitate the execution of the code. Separating it in an infrastructure package to make it easier to evolve later, without changing the core business rules.
Since a shopping cart usually doesn’t live long, using a cached key/value storage would be enough for this solution.

### Consistency
Used identifiers to add or remove items from the cart, avoiding 

### Customers
This solution hasn't considered different customers, although it seems a critical requirement. Taking security into consideration would be recommended to use a way to identify the customer through session or token, for example. For a storage perspective, a key/value map would be enough to keep customers' cart.

### Opportunities
A campaign could be tested in different ways, so I'd recommend to use a strategy like an a/b test (based on customers location or a preset group of users) to evaluate if the strategy is converting more sales.

### Evolving
Versioning was not considered for this solution, but it could be a way to evolve the code later on depeding on how much would change. Feature toggles could also help to evolve it from a production feature if lived on.
