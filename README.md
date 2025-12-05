# Next-Circuit E-Commerce Platform

A full-stack e-commerce application with user authentication, product catalog, shopping cart, and order management. Built with **Node.js**, **Express**, **MongoDB Atlas**, and **Vanilla JavaScript**.

## 🚀 Features

- ✅ User Authentication (Signup/Login with JWT)
- ✅ Product Catalog with Images
- ✅ Shopping Cart Management
- ✅ Order Checkout
- ✅ User Profile Management
- ✅ Password Hashing & Security
- ✅ Input Validation (Joi)
- ✅ MongoDB Atlas Cloud Database
- ✅ RESTful API
- ✅ Responsive Frontend

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js**
- **MongoDB Atlas** (Cloud Database)
- **Mongoose** (ODM)
- **JWT** (Authentication)
- **bcryptjs** (Password Hashing)
- **Joi** (Input Validation)
- **CORS** & **Morgan** (Middleware)

### Frontend
- **HTML5** + **CSS3** (Tailwind)
- **Vanilla JavaScript**
- **Lucide Icons**
- **Fetch API**

## 📋 Prerequisites

- **Node.js** v14+ ([Download](https://nodejs.org/))
- **MongoDB Atlas** Account ([Sign Up Free](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/sharkawy89/Next-circuit-.git
cd "Next-circuit-"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/next-circuit?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
```

**Get your MongoDB Atlas URI:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a cluster (free tier available)
3. Create a database user
4. Click **Connect** → **Drivers** → **Node.js**
5. Copy the connection string and replace `<password>` with your database user password

### 4. Start the Server
```bash
npm run dev
```
Server runs on **http://localhost:5000**

### 5. Seed Sample Data (Optional)
```bash
npm run seed
```
Populates 8 sample products into your database

### 6. Access the Application
- **Frontend**: http://localhost:5000
- **API Docs**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (requires JWT) |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart` | Add to cart |
| GET | `/api/cart` | Get cart items |
| DELETE | `/api/cart/:id` | Remove from cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | Get user orders |

## 🧪 Testing

Run the automated authentication tests:
```bash
cd backend
node test-auth.js
```

Tests verify:
- ✅ User registration
- ✅ Database persistence
- ✅ Login with correct credentials
- ✅ Login rejection with wrong password
- ✅ Duplicate email prevention
- ✅ Password validation

## 📦 Project Structure

```
Next-circuit-/
├── backend/
│   ├── controllers/        # API logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth, validation
│   ├── validators/        # Joi validation schemas
│   ├── .env               # Environment variables (don't commit)
│   ├── .env.example       # Template for .env
│   ├── server.js          # Express app setup
│   ├── package.json       # Dependencies
│   └── seed.js            # Database seeding
├── frontend files (HTML, CSS, JS)
├── .gitignore             # Git exclusions
└── README.md              # This file
```

## 🔐 Security Features

- ✅ Password hashing with **bcryptjs** (10 salt rounds)
- ✅ JWT token authentication (7-day expiration)
- ✅ Input validation with **Joi**
- ✅ CORS protection
- ✅ Environment variables for secrets
- ✅ `.env` file in `.gitignore` (not committed to Git)

## 🚀 Deployment on Heroku

### 1. Install Heroku CLI
Download from [heroku.com/cli](https://devcenter.heroku.com/articles/heroku-cli)

### 2. Login to Heroku
```bash
heroku login
```

### 3. Create Heroku App
```bash
heroku create your-app-name
```

### 4. Set Environment Variables
```bash
heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
heroku config:set JWT_SECRET="your-jwt-secret"
heroku config:set NODE_ENV="production"
```

### 5. Deploy
```bash
git push heroku main
```

### 6. View Logs
```bash
heroku logs --tail
```

## 🚀 Deployment on Render.com

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Click **New** → **Web Service**
4. Connect your GitHub repo
5. Set environment variables (same as above)
6. Deploy

## 🚀 Deployment on Railway.app

1. Go to [railway.app](https://railway.app)
2. Connect GitHub account
3. Select this repository
4. Add environment variables
5. Auto-deploys on push

## 🐛 Troubleshooting

### MongoDB Atlas Connection Failed
**Issue**: `Error: connect ECONNREFUSED` or `connection timed out`

**Solutions**:
- ✅ Check IP whitelist in Atlas → Network Access (add `0.0.0.0/0` for testing)
- ✅ Verify database user credentials are correct
- ✅ Ensure `MONGODB_URI` format: `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
- ✅ Check cluster is running (may take 2-3 minutes to start)

### Port 5000 Already in Use
```bash
# Windows (PowerShell)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force

# Mac/Linux
lsof -ti :5000 | xargs kill -9
```

### Deployment Fails
- ✅ Make sure `.env` is in `.gitignore`
- ✅ Check `Procfile` exists for Heroku
- ✅ Verify all environment variables are set
- ✅ Check logs: `heroku logs --tail`

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret for JWT signing | `your_super_secret_key` |
| `NODE_ENV` | Environment | `production` |

## 🤝 Contributing

Contributions welcome! 

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit: `git commit -m 'Add YourFeature'`
4. Push: `git push origin feature/YourFeature`
5. Open Pull Request

## 📄 License

ISC License - feel free to use this project

## 👨‍💻 Author

**Adham Sharkawy**  
- GitHub: [@sharkawy89](https://github.com/sharkawy89)
- Repository: [Next-circuit-](https://github.com/sharkawy89/Next-circuit-)

## 📞 Support

For issues:
1. Check [Troubleshooting](#troubleshooting) section
2. Open [GitHub Issue](https://github.com/sharkawy89/Next-circuit-/issues)
3. Review [MongoDB Documentation](https://docs.mongodb.com/manual/)

---

**✅ Ready for Production!**
- MongoDB Atlas configured
- All tests passing
- Security best practices implemented
- Ready to deploy
