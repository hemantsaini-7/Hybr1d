# Project Goal

REST API for an e-commerce marketplace.

You will be building a set of REST API endpoints that enable the following functionality

- Buyers and sellers can register and login to the system
- Sellers can build a catalog of items, with each item having a name and price
- Buyers can GET a list of sellers
- Buyers can GET a specific seller's catalog (list of items)
- Buyers can create an Order that contains a list of items from the seller's catalog
- Sellers can GET a list of all orders they've received

## Entities

Entities
Following are the different entities in the system:

#### Users

- Two types: buyers and sellers
- A user can sign up as a buyer or as a seller

#### Catalogs

- A catalog belongs to a seller
- One seller can have one catalog
- A catalog consists of Products

#### Products

- A product has a name and a price

#### Orders

- An order can be created by a buyer to purchase items from a seller's catalog
- An order consists of a list of products

## Functioning of Project

#### Auth APIs

☛ POST /api/auth/register:

- Register a user (accept username, password, type of user - buyer/seller)
- Example:

        * Body => { "username":"hemantsaini", "password":"hemant", "userType":"seller"}

☛ POST /api/auth/login:

- Let a previously registered user log in (e.g. retrieve authentication token)
- Example:

        * Body => { "username":"hemantsaini", "password":"hemant"}

#### APIs for buyers

☛ GET /api/buyer/list-of-sellers:

- Get a list of all sellers

☛ GET /api/buyer/seller-catalog/:seller_id:

- Get the catalog of a seller by seller_id

☛ POST /api/buyer/create-order/:seller_id:

- Send a list of items to create an order for seller with id = seller_id
- Example:

        * Header => Authorization : Bearer Token [Token of Buyer]

        * Body => { "items": [{ "name": "Product 1", "price": 19.99 },{ "name":"Product 2", "price": 50.56 }]}

#### APIs for sellers

☛ POST /api/seller/create-catalog:

- Send a list of items to create a catalog for a seller
- Example:

        * Header => Authorization : Bearer Token [Token of Seller]

        * Body => { "products": [{ "name": "Product 1", "price": 19.99 },{ "name":"Product 2", "price": 50.56 }]}

☛ GET /api/seller/orders:

- Retrieve the list of orders received by a seller
- Example:

        * Header => Authorization : Bearer Token [Token of Seller]

## How to Run Project

1. Cloning the project

---

```
git clone https://github.com/hemantsaini-7/Hybr1d.git
```

2. Create a .env file on root directory like

---

```
PORT = 4000
MONGO_URI = YOUR_MONGO_URI
JWT_SECRET = JWT_SECRET
```

3. Install project dependencies

---

```
npm install
```

4. Run Project on local

---

```
node index.js or nodemon index.js
```

5. Test the API endpoints, I have used Postman for that
