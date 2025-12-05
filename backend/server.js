const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev')); // HTTP request logging
app.use(express.json());

// Serve static frontend files
const frontendPath = path.join(__dirname, '../');
app.use(express.static(frontendPath));

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/next-circuit';
console.log(`📡 Connecting to MongoDB...`);

const connectWithRetry = async (retries = 5) => {
    for (let i = 0; i < retries; i++) {
        try {
            await mongoose.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000,
            });
            console.log('✅ MongoDB connected successfully');
            return;
        } catch (err) {
            console.error(`❌ MongoDB connection attempt ${i + 1}/${retries} failed:`, err?.message);
            if (i === retries - 1) {
                console.error('📌 MongoDB connection failed after all retries.');
                console.error('📌 For MongoDB Atlas, ensure:');
                console.error('   1. Your IP is whitelisted in Atlas Network Access');
                console.error('   2. Database user credentials are correct');
                console.error('   3. MONGODB_URI format is: mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority');
                process.exit(1);
            }
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
};

connectWithRetry();

// More detailed connection error events
mongoose.connection.on('error', err => {
    console.error('🛑 Mongoose connection error event:', err?.message || err);
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: '✅ Backend is running', timestamp: new Date() });
});

// Serve frontend pages
app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(frontendPath, 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(frontendPath, 'signup.html'));
});

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(frontendPath, 'checkout.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
    // Use HOST env var if provided for flexible messaging in containers/hosts
    module.exports = app;
    console.log(`📖 Visit http://${HOST}:${PORT} to see the app`);
    console.log(`📡 API available at http://${HOST}:${PORT}/api`);
});
 

// At the end of your backend/server.js file:
const path = require('path');
// ... all your API routes ...

// Serve the static frontend files
app.use(express.static(path.join(__dirname, '..', 'frontend'))); // Assuming frontend files are in a 'frontend' directory adjacent to 'backend'

// Add a catch-all route to serve your index file for any unhandled routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Replace app.listen with module.exports for Vercel
module.exports = app; 