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
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000 
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
    console.error('❌ MongoDB connection error:', err && err.message ? err.message : err);
    console.error('📌 Tips: Ensure MongoDB is running and `MONGODB_URI` is correct.');
    // Exit so the developer sees the failure immediately (prevents server running without DB)
    process.exit(1);
});

// More detailed connection error events
mongoose.connection.on('error', err => {
    console.error('🛑 Mongoose connection error event:', err && err.message ? err.message : err);
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
app.listen(PORT, () => {
    console.log(`🚀 Full-Stack Server running on http://localhost:${PORT}`);
    console.log(`📖 Visit http://localhost:${PORT} to see the app`);
    console.log(`📡 API available at http://localhost:${PORT}/api`);
});
