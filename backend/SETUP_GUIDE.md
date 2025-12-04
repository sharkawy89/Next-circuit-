# index Backend Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

## Step 1: Install Dependencies
```bash
cd backend
npm install
```

## Step 2: Setup MongoDB

### Option A: Local MongoDB
1. Download and install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
   - Windows: Open PowerShell as admin and run `mongod`
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string and update `.env` file

## Step 3: Update Environment Variables
The `.env` file is already configured with default values:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/index
JWT_SECRET=next_circuit_super_secret_key_2024
NODE_ENV=development
```

If using MongoDB Atlas, replace `MONGODB_URI` with your connection string.

## Step 4: Seed Initial Data
```bash
npm run seed
```

This will populate the database with sample products.

## Step 5: Start the Server

### Development (with auto-reload)
```bash
npm run dev
```

### Production
```bash
npm start
```

You should see:
```
Server running on http://localhost:5000
MongoDB connected
```

## Step 6: Test the API

### Using cURL
```bash
# Check if server is running
curl http://localhost:5000/api/health

# Get all products
curl http://localhost:5000/api/products
```

### Using Postman
1. Download Postman from https://www.postman.com/downloads/
2. Import the API routes
3. Set base URL to `http://localhost:5000`
4. Start testing endpoints

### Using VS Code REST Client
1. Install "REST Client" extension by Huachao Mao
2. Create a `.rest` or `.http` file
3. Write requests and execute them directly in VS Code

## Common Issues

### "MongoDB connection error"
- Make sure MongoDB is running locally or Atlas connection string is correct
- Check if port 27017 is not blocked

### "Port 5000 already in use"
- Change PORT in `.env` file
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

### "Cannot find module 'express'"
- Run `npm install` in the backend directory
- Delete `node_modules` and reinstall: `rm -r node_modules && npm install`

## Adding to Frontend

Update your frontend JavaScript to use the backend API:

```javascript
const API_URL = 'http://localhost:5000/api';

// Example: Register
async function register(name, email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword: password })
    });
    return response.json();
}

// Example: Get products
async function getProducts() {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
}
```

## Next Steps

1. Update frontend to use backend API endpoints
2. Add CORS headers if needed (already configured)
3. Implement payment gateway integration
4. Add more advanced features (wishlist, reviews, etc.)
5. Deploy backend to hosting service (Heroku, Railway, etc.)

## Useful Resources

- Express Documentation: https://expressjs.com
- MongoDB Documentation: https://docs.mongodb.com
- JWT Authentication: https://jwt.io
- REST API Best Practices: https://restfulapi.net
