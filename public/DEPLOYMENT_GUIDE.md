# 🚀 Next-Circuit E-Commerce - Deployment Guide

Complete guide to deploy Next-Circuit on your local machine, GitHub, and production.

---

## 📋 Project Overview

**Next-Circuit** is a full-stack e-commerce application with:
- **Frontend:** HTML5, CSS3 (Tailwind), Vanilla JavaScript
- **Backend:** Node.js (Express), MongoDB (Mongoose)
- **Authentication:** JWT tokens, bcryptjs password hashing
- **API:** 23 RESTful endpoints (auth, products, cart, orders, users)
- **Validation:** Joi schemas for input validation

---

## 🏠 Local Setup (Your PC)

### Prerequisites
- Node.js (v14+)
- MongoDB Community Server (installed on your PC)
- Git
- Text editor (VS Code recommended)

### Step 1: Clone/Download Project

```bash
# If using Git
git clone https://github.com/sharkawy89/Next-circuit-.git
cd Next-circuit-

# Or extract the ZIP file and navigate to project root
```

### Step 2: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Go back to root (optional for frontend - uses CDN)
cd ..
```

### Step 3: Start MongoDB Service

**Windows:**
```powershell
# If MongoDB is installed as a service
Start-Service -Name MongoDB

# Verify it's running
Get-Service -Name MongoDB | Select-Object Name, Status
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Step 4: Run Backend Server

```bash
cd backend
npm run dev
```

**Expected output (host/port may vary):**
```
✅ MongoDB connected
🚀 Full-Stack Server running on http://<HOST>:<PORT> (defaults to HOST=localhost, PORT=5000)
📖 Visit http://<HOST>:<PORT> to see the app
📡 API available at http://<HOST>:<PORT>/api
```

### Step 5: Access Application

Open in browser (replace PORT if you changed it):
- **Home Page:** http://localhost:${PORT:-5000}
- **Sign Up:** http://localhost:${PORT:-5000}/signup.html
- **Login:** http://localhost:${PORT:-5000}/login.html
- **API Health:** http://localhost:${PORT:-5000}/api/health

### Step 6: Test Authentication Flow

Open terminal in `backend` folder:
```bash
node test-auth.js
```

Should show:
```
✅ All tests passed! ✅

Summary:
  ✓ User registration works
  ✓ Data is saved to MongoDB
  ✓ Login works with correct credentials
  ✓ Login rejects wrong password
  ✓ Duplicate emails are rejected
  ✓ Password validation works
```

---

## 🐙 GitHub Deployment

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Name: `Next-circuit`
3. Description: `Full-stack e-commerce application`
4. Choose **Public** (for portfolio) or **Private**
5. Click **Create Repository**

### Step 2: Push Project to GitHub

```bash
# Navigate to project root
cd D:\swe\ proj\ 03

# Initialize Git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/Next-circuit.git

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Full-stack e-commerce with auth, products, cart, orders"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: GitHub Important Notes

**DO NOT push `.env` file!** It contains secrets.

Check `.gitignore`:
```
# backend/.gitignore should include:
node_modules/
.env
.env.local
.DS_Store
npm-debug.log
```

**To create `.gitignore` if missing:**
```bash
# In backend folder
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo "npm-debug.log" >> .gitignore
```

---

## 🌐 Production Deployment (Heroku / Render)

### Option A: Deploy on Render (Free Tier Available)

#### 1. Create MongoDB on Atlas (Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Create a **M0 Free Cluster**
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/next-circuit?retryWrites=true&w=majority`

#### 2. Deploy on Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Name:** next-circuit
   - **Environment:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
6. Add Environment Variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/next-circuit?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-key-change-this
   ```
7. Click **Create Web Service**

**Your app is live at:** `https://next-circuit.render.com`

#### 3. Seed Database (if empty)

```bash
# SSH into Render or run locally
cd backend
npm run seed
```

---

### Option B: Deploy on Heroku

#### 1. Install Heroku CLI

```bash
# Windows
choco install heroku-cli

# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

#### 2. Create Heroku App

```bash
heroku login
cd backend
heroku create next-circuit
```

#### 3. Set Environment Variables

```bash
heroku config:set MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/next-circuit"
heroku config:set JWT_SECRET="your-secret-key"
heroku config:set NODE_ENV="production"
```

#### 4. Deploy

```bash
git push heroku main
```

**Your app is live at:** `https://next-circuit.herokuapp.com`

---

## 📊 API Endpoints Reference

### Authentication
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
GET    /api/auth/profile      - Get user profile (protected)
```

### Products
```
GET    /api/products/all      - Get all products
GET    /api/products/:id      - Get single product
POST   /api/products          - Create product (admin)
PUT    /api/products/:id      - Update product (admin)
DELETE /api/products/:id      - Delete product (admin)
```

### Cart
```
GET    /api/cart              - Get user's cart
POST   /api/cart/add          - Add item to cart
PUT    /api/cart/update       - Update cart item
POST   /api/cart/remove       - Remove from cart
DELETE /api/cart/clear        - Clear entire cart
```

### Orders
```
POST   /api/orders            - Create order
GET    /api/orders            - Get user's orders
GET    /api/orders/:id        - Get order by ID
PUT    /api/orders/:id/status - Update order status (admin)
DELETE /api/orders/:id/cancel - Cancel order
```

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS (Render/Heroku do this automatically)
- [ ] Add rate limiting (optional enhancement)
- [ ] Use MongoDB Atlas with IP whitelisting
- [ ] Enable CORS only for your domain
- [ ] Add email verification (optional)
- [ ] Set up error logging (Sentry, LogRocket)

---

## 🐛 Troubleshooting

### "MongoDB connection error"
- ✅ Ensure MongoDB is running: `Get-Service -Name MongoDB`
- ✅ Check `.env` has correct `MONGODB_URI`
- ✅ For Atlas, verify IP is whitelisted

### "Port 5000 already in use"
```powershell
# Kill Node process
Get-Process -Name node | Stop-Process -Force

# Or use different port
PORT=5001 npm run dev
```

### "Cannot find module 'joi'" or other dependencies
```bash
cd backend
npm install
```

### Tests failing
```bash
# Ensure server is running first
npm run dev

# In another terminal
node test-auth.js
```

---

## 📦 Project Structure

```
Next-circuit/
├── backend/
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Auth, validation
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── validators/          # Joi schemas
│   ├── server.js            # Express app
│   ├── seed.js              # Database seeding
│   ├── test-auth.js         # Authentication tests
│   ├── package.json         # Dependencies
│   ├── .env                 # Environment (SECRET - do not commit)
│   └── .env.example         # Template (commit this)
├── index.html               # Home page
├── index.js                 # Frontend app logic
├── index.css                # Styles
├── login.html               # Login page
├── signup.html              # Signup page
├── checkout.html            # Checkout page
├── COMPLETE_FLOW_DOCUMENTATION.md
├── MONGODB_SETUP.md
└── README.md
```

---

## 🚀 Quick Commands

```bash
# Development
cd backend
npm install          # Install dependencies
npm run dev          # Start with hot reload
npm run seed         # Seed database

# Testing
node test-auth.js    # Run authentication tests

# Production
npm start             # Start without reload

# Git
git add .
git commit -m "message"
git push origin main
```

---

## 📝 Environment Variables

**Development (.env):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/next-circuit
JWT_SECRET=dev_secret_key_change_in_production
NODE_ENV=development
```

**Production (.env on server):**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/next-circuit?retryWrites=true&w=majority
JWT_SECRET=production_secret_key_very_long_random_string
NODE_ENV=production
```

---

## 💡 Next Steps (Optional Enhancements)

- [ ] Add email verification on signup
- [ ] Implement password reset functionality
- [ ] Add OAuth (Google, GitHub login)
- [ ] Implement payment gateway (Stripe, PayPal)
- [ ] Add admin dashboard
- [ ] Implement search/filters
- [ ] Add product reviews and ratings
- [ ] Set up automated testing (Jest)
- [ ] Add error tracking (Sentry)
- [ ] Set up CI/CD pipeline (GitHub Actions)

---

## 📞 Support

For issues:
1. Check error logs: `npm run dev` console output
2. Run tests: `node test-auth.js`
3. Check `.env` file configuration
4. Verify MongoDB is running

---

**Happy Deploying! 🎉**

Your Next-Circuit e-commerce app is now ready for production!
