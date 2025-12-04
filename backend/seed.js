const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const MOCK_PRODUCTS = [
    // Smartphones
    {
        name: 'iPhone 15 Pro Max 256GB',
        brand: 'Apple',
        description: 'Titanium design, A17 Pro chip, Pro camera system with 5x Telephoto.',
        price: 1199.99,
        originalPrice: 1299.99,
        image: 'iphone 15.jpg',
        rating: 4.9,
        stock: 12,
        category: 'smartphones',
        isBestSeller: true,
        discount: 8
    },
    {
        name: 'Samsung Galaxy S24 Ultra',
        brand: 'Samsung',
        description: '6.8" Dynamic AMOLED, Snapdragon 8 Gen 3, 200MP camera, S Pen included.',
        price: 1099.99,
        originalPrice: 1199.99,
        image: 'samsung ssd.jpg',
        rating: 4.8,
        stock: 8,
        category: 'smartphones',
        isBestSeller: true,
        discount: 8
    },
    {
        name: 'OnePlus 12 256GB',
        brand: 'OnePlus',
        description: 'Snapdragon 8 Gen 3, 100W fast charging, 50MP triple camera system.',
        price: 799.99,
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop',
        rating: 4.7,
        stock: 15,
        category: 'smartphones',
        discount: 0
    },
    // Laptops
    {
        name: 'MacBook Pro 16" M3 Max',
        brand: 'Apple',
        description: 'M3 Max chip, 36GB RAM, 1TB SSD, Liquid Retina XDR display.',
        price: 3499.99,
        originalPrice: 3699.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
        rating: 4.9,
        stock: 5,
        category: 'laptops',
        isBestSeller: true,
        discount: 5
    },
    {
        name: 'Dell XPS 15',
        brand: 'Dell',
        description: 'Intel Core i9, NVIDIA RTX 4090, 32GB RAM, OLED display.',
        price: 2799.99,
        image: 'https://images.unsplash.com/photo-1588872657840-218e412ee5ff?w=400&h=300&fit=crop',
        rating: 4.7,
        stock: 10,
        category: 'laptops',
        discount: 0
    },
    // Gaming
    {
        name: 'Nintendo Switch OLED',
        brand: 'Nintendo',
        description: '7" OLED screen, 64GB internal storage, Joy-Con controllers.',
        price: 349.99,
        image: 'Ninetendo switch.jpg',
        rating: 4.8,
        stock: 20,
        category: 'gaming',
        isBestSeller: true,
        discount: 0
    },
    {
        name: 'PlayStation 5',
        brand: 'Sony',
        description: 'Ultra HD, 4K gaming, 825GB SSD, DualSense controller.',
        price: 499.99,
        image: 'sony bravia.jpg',
        rating: 4.9,
        stock: 7,
        category: 'gaming',
        isBestSeller: true,
        discount: 0
    },
    // Accessories
    {
        name: 'AirPods Pro 2',
        brand: 'Apple',
        description: 'Active noise cancellation, spatial audio, wireless charging.',
        price: 249.99,
        image: 'airbuds pro2.jpg',
        rating: 4.8,
        stock: 25,
        category: 'accessories',
        isBestSeller: true,
        discount: 0
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:0.0.0.0/Next-circuit', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert mock products
        const products = await Product.insertMany(MOCK_PRODUCTS);
        console.log(`${products.length} products inserted successfully`);

        await mongoose.disconnect();
        console.log('Database seeding completed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
