const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for existing user (duplicate email)
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, error: 'Email is already registered' });
        }

        // Create user (password hashing occurs in model pre-save hook)
        const user = new User({ name, email, password });
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your_jwt_secret_key_here',
            { expiresIn: '7d' }
        );

        // Return consistent JSON response
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Register handler error:', error);

        // Handle duplicate key or validation errors gracefully
        if (error && error.code === 11000) {
            return res.status(400).json({ success: false, error: 'Email is already registered' });
        }
        if (error && error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ success: false, error: messages.join(', ') });
        }

        return res.status(500).json({ success: false, error: 'Server error during registration' });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your_jwt_secret_key_here',
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login handler error:', error);
        return res.status(500).json({ success: false, error: 'Server error during login' });
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('GetProfile error:', error);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
};
