# Next-circuit Backend API

A Node.js/Express backend API for the Next-circuit e-commerce store.

## Features

- User authentication (register, login) with JWT
- Product management (CRUD operations)
- Shopping cart functionality
- Order management
- User profiles with address management
- MongoDB integration

## Installation

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Setup MongoDB**
   - Install MongoDB locally or use MongoDB Atlas (cloud)
   - Create a database named `Next-circuit`

3. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Update the following values:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/Next-circuit
     JWT_SECRET=your_secure_jwt_secret_here
     NODE_ENV=development
     ```

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:${PORT:-5000}` (replace PORT in `.env` if changed)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)

### Products
- `GET /api/products` - Get all products (with filtering options)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/clear` - Clear entire cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (admin)
- `DELETE /api/orders/:id/cancel` - Cancel order

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin)

## API Request Examples

### Register User
```bash
POST http://localhost:${PORT:-5000}/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Login
```bash
POST http://localhost:${PORT:-5000}/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get All Products
```bash
GET http://localhost:${PORT:-5000}/api/products
```

### Filter Products
```bash
GET http://localhost:${PORT:-5000}/api/products?category=smartphones&minPrice=500&maxPrice=1500
```

### Add to Cart (requires token)
```bash
POST http://localhost:${PORT:-5000}/api/cart/add
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 1
}
```

### Create Order (requires token)
```bash
POST http://localhost:${PORT:-5000}/api/orders
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

## Project Structure

```
backend/
├── models/              # MongoDB schemas
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── controllers/         # Business logic
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── userController.js
├── routes/             # API routes
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   ├── orders.js
│   └── users.js
├── middleware/         # Custom middleware
│   └── auth.js        # JWT authentication
├── server.js          # Main server file
├── package.json       # Dependencies
└── .env              # Environment variables
```

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Database Schema

### User
- name: String
- email: String (unique)
- password: String (hashed)
- phone: String
- address: Object
- role: String (user/admin)

### Product
- name: String
- brand: String
- description: String
- price: Number
- originalPrice: Number
- discount: Number
- category: String
- image: String
- rating: Number
- stock: Number
- isBestSeller: Boolean

### Cart
- userId: ObjectId (ref: User)
- items: Array of cart items
- createdAt: Date
- updatedAt: Date

### Order
- orderId: String (unique)
- userId: ObjectId (ref: User)
- items: Array of ordered items
- totalAmount: Number
- status: String
- shippingAddress: Object
- paymentMethod: String
- paymentStatus: String

## Notes

- Password hashing is handled using bcryptjs
- JWT tokens expire after 7 days
- All timestamps are stored in UTC
- MongoDB Next-circuites are automatically created for unique fields

## Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Email notifications
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard
- Search optimization
- Rate limiting
