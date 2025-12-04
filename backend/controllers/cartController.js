const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.userId }).populate('items.productId');
        if (!cart) {
            cart = new Cart({ userId: req.userId, items: [] });
            await cart.save();
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        if (product.stock < quantity) {
            return res.status(400).json({ error: 'Insufficient stock' });
        }
        
        let cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            cart = new Cart({ userId: req.userId, items: [] });
        }
        
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId,
                quantity,
                price: product.price
            });
        }
        
        cart.updatedAt = Date.now();
        await cart.save();
        
        res.status(200).json({
            message: 'Item added to cart',
            cart: await cart.populate('items.productId')
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        
        const cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        cart.updatedAt = Date.now();
        await cart.save();
        
        res.status(200).json({
            message: 'Item removed from cart',
            cart: await cart.populate('items.productId')
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        const cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        
        const item = cart.items.find(item => item.productId.toString() === productId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }
        
        if (quantity <= 0) {
            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        } else {
            item.quantity = quantity;
        }
        
        cart.updatedAt = Date.now();
        await cart.save();
        
        res.status(200).json({
            message: 'Cart updated',
            cart: await cart.populate('items.productId')
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        
        cart.items = [];
        cart.updatedAt = Date.now();
        await cart.save();
        
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
