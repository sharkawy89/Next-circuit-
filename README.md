# Next-Circuit 🛒 - Full-Stack E-Commerce Platform

A complete, production-ready e-commerce application built with Node.js, Express, MongoDB, and vanilla JavaScript. Features user authentication, product catalog, shopping cart, and order management.

## ✨ Features

- **User Authentication** - Secure signup/login with JWT tokens and bcryptjs password hashing
- **Product Catalog** - Browse products with filtering, categories, and search
- **Shopping Cart** - Add/remove items with real-time updates
- **Order Management** - Place orders and track order status
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Input Validation** - Joi schemas for all user inputs
- **Error Handling** - Comprehensive error handling with meaningful messages
- **API Testing** - Automated test suite for authentication flow
- **Database Persistence** - MongoDB integration with Mongoose ODM

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Joi** - Input validation
- **morgan** - HTTP logging

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Tailwind CSS utility framework
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Lucide Icons** - Icon library

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sharkawy89/Next-circuit-.git
   cd Next-circuit-
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment**
   ```bash
   # Create .env file (copy from .env.example)
   cp .env.example .env
   
   # Edit .env with your MongoDB URI
   # MONGODB_URI=mongodb://localhost:27017/next-circuit
   ```

4. **Start MongoDB**
   ```bash
   # Windows service
   Start-Service -Name MongoDB
   
   # Or run mongod directly
   mongod --dbpath "C:\data\db"
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

6. **Access the app**
   - Open http://localhost:5000
   - Sign up at http://localhost:5000/signup.html
   - Log in at http://localhost:5000/login.html

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products/all` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update` - Update cart item
- `POST /api/cart/remove` - Remove from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update status (admin)
- `DELETE /api/orders/:id/cancel` - Cancel order

## 🧪 Testing

Run the automated authentication test suite:

```bash
cd backend
node test-auth.js
```

This tests:
- ✓ User registration with validation
- ✓ Data persistence in MongoDB
- ✓ User login with correct credentials
- ✓ Login rejection with wrong password
- ✓ Duplicate email prevention
- ✓ Password strength validation

## 📦 Project Structure

```
backend/
├── controllers/        # Request handlers (auth, products, cart, orders, users)
├── middleware/         # Auth, validation middleware
├── models/             # MongoDB schemas (User, Product, Cart, Order)
├── routes/             # API route handlers
├── validators/         # Joi validation schemas
├── server.js           # Express application
├── seed.js             # Database seeding script
├── test-auth.js        # Authentication tests
├── package.json        # Dependencies
└── .env               # Environment variables (not committed)

frontend files (root):
├── index.html          # Home page
├── index.js            # Frontend logic
├── index.css           # Styles
├── login.html          # Login page
├── signup.html         # Signup page
└── checkout.html       # Checkout page
```

## 🔐 Authentication

- **Password Hashing** - bcryptjs with 10 salt rounds
- **Tokens** - JWT with 7-day expiration
- **Validation** - Joi schemas enforce email format, password strength
- **Protected Routes** - Bearer token required for protected endpoints

## 🚢 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for:
- Local setup instructions
- GitHub deployment steps
- Production deployment (Render, Heroku)
- MongoDB Atlas configuration

**Quick deploy to Render:**
1. Push code to GitHub
2. Go to https://render.com
3. Connect repository
4. Set environment variables
5. Deploy

## 📝 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/next-circuit
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

See `.env.example` for template.

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running, check MONGODB_URI |
| Port 5000 in use | `Get-Process -Name node \| Stop-Process -Force` |
| Dependencies missing | `cd backend && npm install` |
| Tests failing | Start server first (`npm run dev`), then run tests |

See [COMPLETE_FLOW_DOCUMENTATION.md](./COMPLETE_FLOW_DOCUMENTATION.md) for detailed troubleshooting.

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Complete deployment guide
- [COMPLETE_FLOW_DOCUMENTATION.md](./COMPLETE_FLOW_DOCUMENTATION.md) - Architecture & flow
- [MONGODB_SETUP.md](./MONGODB_SETUP.md) - MongoDB setup guide
- [backend/README.md](./backend/README.md) - Backend API docs

## 🎯 Key Features Implemented

✅ User registration with email validation  
✅ Secure login with JWT tokens  
✅ Password hashing with bcryptjs  
✅ Product catalog with filtering  
✅ Shopping cart management  
✅ Order creation and tracking  
✅ Input validation with Joi  
✅ Comprehensive error handling  
✅ Request logging with morgan  
✅ Automated test suite  

## 🔄 Development Workflow

```bash
# Start development server with auto-reload
npm run dev

# Run tests in another terminal
node test-auth.js

# Seed database with sample data
npm run seed

# Production build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see LICENSE file for details.

## 👨‍💻 Author

**Sharkawy89** - Full-stack developer

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Lucide Icons](https://lucide.dev) - Icon library
- [MongoDB](https://www.mongodb.com) - Database
- [Express.js](https://expressjs.com) - Web framework

---

**Ready to deploy? See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for production setup!**

**Questions? Check [COMPLETE_FLOW_DOCUMENTATION.md](./COMPLETE_FLOW_DOCUMENTATION.md) for detailed architecture explanation.**
