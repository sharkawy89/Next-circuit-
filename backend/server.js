const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression'); 

// Load environment variables (needed for local development)
dotenv.config();

const app = express();

// --- Middleware ---
app.use(morgan('dev')); // HTTP request logging
app.use(express.json()); // Body parsing
app.use(compression()); // Response compression

// --- CORS Configuration ---
const allowedOrigins = [
    'https://next-circuit-43ai.vercel.app', 
    process.env.FRONTEND_URL || 'http://localhost:5000'
];

const corsOptions = {
    // Allows requests from the domains in your allowedOrigins array
    origin: (origin, callback) => {
        // Allows requests with no origin (e.g., direct API access, mobile apps)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], // Important for JWT
    credentials: true
};

app.use(cors(corsOptions));

// --- Static File Serving ---
// The correct path: '..' moves up from 'backend' to the repository root (where index.html is).
const frontendPath = path.join(__dirname, '../'); 
app.use(express.static(frontendPath));

// --- MongoDB Connection Logic (Consolidated and Robust) ---
const mongoUri = process.env.MONGODB_URI; 

if (!mongoUri) {
    console.error("FATAL: MONGODB_URI is not set in environment variables!");
    // Vercel deployment will crash if this critical variable is missing, which is expected.
}

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
                console.error('📌 MongoDB connection failed after all retries. Exiting server process.');
                // Critical failure: Exiting the Node process if DB connection fails after retries.
                process.exit(1); 
            }
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
};

// Initiate the connection. This runs asynchronously.
connectWithRetry();

// Detailed connection error event logging
mongoose.connection.on('error', err => {
    console.error('🛑 Mongoose connection error event:', err?.message || err);
});


// --- API Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: '✅ Backend is running', timestamp: new Date() });
});

// --- Frontend Page Routes ---
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

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Internal server error' });
});


// --- Local Development Logic ---
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

// This block only runs locally since NODE_ENV is set to 'production' on Vercel.
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, HOST, () => {
        console.log(`Server running at http://${HOST}:${PORT}`);
    });
}

// --- Vercel Export (MUST be the final executable line) ---
// Vercel requires the Express app instance to be exported as a module.
module.exports = app;