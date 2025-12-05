# 🚀 MongoDB Setup Guide for Next-Circuit

Your signup/login system requires MongoDB to store user data. Choose one option below:

## Option A: MongoDB Local Installation (Windows)

### Step 1: Download & Install MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select **Windows** and download the MSI installer
3. Run the installer and follow the wizard
4. Choose **Install MongoDB as a Service** (recommended)

### Step 2: Start MongoDB Service
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# Start the service (if stopped)
Start-Service -Name MongoDB

# Verify it's running
Get-Service -Name MongoDB | Select-Object Name, Status
```

### Step 3: Verify Connection
```powershell
# Test connection (requires mongo shell)
mongo --eval "db.version()"
```

---

## Option B: MongoDB Atlas (Free Cloud) ⭐ RECOMMENDED

### Step 1: Create Free Cluster
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new **M0 Free Cluster** (it's free forever with limits)
4. Wait for cluster to be deployed (~10 minutes)

### Step 2: Get Connection String
1. Click **Connect** on your cluster
2. Choose **Drivers** → **Node.js**
3. Copy the connection string that looks like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

### Step 3: Update .env File
1. Open `backend/.env`
2. Replace the `MONGODB_URI` line:
   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/next-circuit?retryWrites=true&w=majority
   ```
3. Save the file

### Step 4: Whitelist Your IP (Atlas)
1. Go to **Network Access** in Atlas
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for development)
   - For production, add your specific IP only
4. Confirm

---

## Testing Your Setup

Once MongoDB is set up (local or Atlas), run:

```powershell
cd backend

# Install dependencies (if not done yet)
npm install

# Start the server
npm run dev
```

You should see (host/port may vary):
```
✅ MongoDB connected
🚀 Full-Stack Server running on http://<HOST>:<PORT> (defaults to HOST=localhost, PORT=5000)
```

### Run Automated Tests
In a **new PowerShell terminal**:

```powershell
cd backend
node test-auth.js
```

This will test:
- ✅ User registration (signup)
- ✅ Data saved to MongoDB
- ✅ User login
- ✅ Wrong password rejection
- ✅ Duplicate email rejection
- ✅ Password validation

---

## Troubleshooting

### "Connection refused" or "buffering timed out"
- **Local:** MongoDB service is not running → Start it with `Start-Service -Name MongoDB`
- **Atlas:** Connection string is wrong or IP not whitelisted → Double-check both

### "User already exists" when testing
- The test uses a unique email each time (Date.now()), so this shouldn't happen
- If it does, your data IS being saved (which is good!)

### "Cannot find module 'morgan'"
```powershell
cd backend
npm install
```

---

## How Sign-Up → DB → Login Works

1. **Sign-Up (Frontend → Backend)**
   - User fills form on `signup.html`
   - Clicks "Create Account" → POST to `/api/auth/register`
   - Backend validates (password match, unique email)
   - Hashes password with bcryptjs (10 rounds)
   - Saves user to MongoDB
   - Returns JWT token

2. **User Data Saved (MongoDB)**
   - Collection: `users`
   - Fields: name, email, hashedPassword, role, timestamps
   - Each user gets unique `_id` (MongoDB ObjectId)

3. **Login (Frontend → Backend)**
   - User fills form on `login.html`
   - Clicks "Sign In" → POST to `/api/auth/login`
   - Backend looks up user by email
   - Compares hashed password with bcrypt
   - If match: returns JWT token
   - If no match: returns "Invalid credentials"

4. **Frontend Stores Session**
   - Token saved to `localStorage.authToken`
   - User session saved to `sessionStorage.userSession`
   - `index.html` checks for session on load
   - If logged in: shows products and cart
   - If not logged in: redirects to login

---

## Next Steps

1. **Choose MongoDB option** (Local or Atlas)
2. **Complete setup** (install or get connection string)
3. **Update `.env`** if using Atlas
4. **Run server**: `npm run dev`
5. **Run tests**: `node test-auth.js`
6. **View results** and verify all tests pass ✅

---

## Quick Commands Reference

```powershell
# Start MongoDB (Windows service)
Start-Service -Name MongoDB

# Start MongoDB (if running mongod manually)
mongod --dbpath "C:\data\db"

# Install dependencies
cd backend
npm install

# Run server with live reload
npm run dev

# Run server without reload
npm start

# Seed database with sample products
npm run seed

# Run authentication tests
node test-auth.js
```

---

**Questions?** Check the terminal output when running `npm run dev` — it will tell you exactly what's wrong with MongoDB connection.
