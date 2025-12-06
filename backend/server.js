const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const db = require('./lib/db'); // MongoDB client module

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(compression());

const allowedOrigins = [
    'https://next-circuit-43ai.vercel.app',
    process.env.FRONTEND_URL || 'http://localhost:5000'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// Serve static frontend files from public directory
const frontendPath = path.join(__dirname, '..', 'public');
app.use(express.static(frontendPath));

// Connect to MongoDB using native MongoClient
console.log('📡 Initializing MongoDB connection...');
db.connectWithRetry()
    .then(() => {
        console.log('✅ MongoDB initialized successfully');
    })
    .catch(err => {
        console.error('❌ MongoDB initialization error:', err?.message || err);
        process.exit(1);
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

// SPA fallback: serve index.html for unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
    console.log(`📡 API available at http://${HOST}:${PORT}/api`);
});

module.exports = app;