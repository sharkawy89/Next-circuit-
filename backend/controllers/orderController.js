const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create order
exports.createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;
        
        const cart = await Cart.findOne({ userId: req.userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }
        
        const items = cart.items.map(item => ({
            productId: item.productId._id,
            name: item.productId.name,
            price: item.price,
            quantity: item.quantity
        }));
        
        const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        const order = new Order({
            userId: req.userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
            status: 'pending',
            paymentStatus: 'pending'
        });
        
        await order.save();
        
        // Clear cart after order
        cart.items = [];
        await cart.save();
        
        res.status(201).json({
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId }).populate('items.productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.productId');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        // Check if order belongs to user
        if (order.userId.toString() !== req.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;
        
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status, paymentStatus, updatedAt: Date.now() },
            { new: true }
        );
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.status(200).json({
            message: 'Order updated successfully',
            order
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        if (order.userId.toString() !== req.userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        
        if (order.status !== 'pending') {
            return res.status(400).json({ error: 'Can only cancel pending orders' });
        }
        
        order.status = 'cancelled';
        order.updatedAt = Date.now();
        await order.save();
        
        res.status(200).json({
            message: 'Order cancelled successfully',
            order
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
